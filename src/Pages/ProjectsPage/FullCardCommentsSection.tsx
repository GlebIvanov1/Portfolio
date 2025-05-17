import { child, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DefaultUserImg from '../../../public/img/person-circle.svg';
import { useIsLogin } from "../../Hooks";
import CommentsEmpty from "./CommentsEmpty";
import EditPage from "./EditPage";
import styles from './styles.module.scss';

interface initialStateType {
    messages: string[];
    id: object;
    type: string;
}

const initialState: initialStateType = {
    messages: [],
    id: {},
    type: ''
}
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'message': 
            return {
                ...state,
                messages: action?.messages || [],
            };
            
        case 'id': 
            return {
                ...state,
                id: action?.id || {}
            };

        case 'message and id': 
            return {
                ...state,
                messages: action?.messages || [],
                id: action?.id || {}
            }

        default:
            return state;
    }
}

const FullCardCommentsSection: React.FC = () => {
    const db = getDatabase();                           
    const [userImg, setUserImg] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const uid = useSelector((state: any) => state.user.id)
    const ProjectId = useSelector((state: any) => state.project.ProjectId);
    const dbRef = ref(getDatabase());
    const isLogin = useIsLogin();
    const [messagesReducer, ReducerDispatch] = useReducer(reducer, initialState);
    const [messagesMenuOpen, setMessagesMenuOpen] = useState({id: null, open: false});
    const email = useSelector((state: any) => state.user.email);
    const [editPage, setEditPage] = useState(false);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        const setMessages = onValue(ref(db, 'projectComments/' + String(ProjectId)), (snapshot) => {
            if(snapshot.exists()){
                const messages = snapshot.val()?.comments?.[0]?.messages || [];
                ReducerDispatch({type: 'message', messages: messages});
            } else {    
                ReducerDispatch({ type: 'message', messages: [] });
            }
        })

        return () => setMessages();
    }, [ProjectId])

    useEffect(() => {
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if(snapshot.exists()){
                setUserImg(snapshot.val().profilePicture);
            } else{
                console.error('Profile Picture No data availble');
            }
        }).catch(() => {
            setUserImg('')
        }) 
    }, [uid])

    useEffect(() => {
        get(child(dbRef, 'projectComments/' + 'CommentsId/')).then((snapshot) => {
            if(snapshot.exists()){
                ReducerDispatch({type: 'id', id: snapshot.val()});
            } else{
                console.error('Comments Id No data availble');
            }
        }).catch(() => {
            console.error('Error');
            
        }) 
    }, [uid, messagesReducer.messages])

    useEffect(() => {
        inputRef.current?.focus();
    }, [editPage])

    const EditMessageFunction = () => {
        const currentMessage = messagesReducer.messages[Number(messagesMenuOpen.id)]

        if(editInputValue){
            update(ref(db, 'projectComments/' + ProjectId + '/' + 'comments' + '/' + '0' + '/' + 'messages'), {
                [Number(messagesMenuOpen.id)]: editInputValue,
            });
            
            setEditPage(false);
            setMessagesMenuOpen({id: null, open: false})
        } else{
            alert('You can\'t change this message to empty.');
            setEditInputValue(currentMessage);
            inputRef.current.focus();
        }
    }   

    const setComments = (ProjectId: number) => {
        set(ref(db, 'projectComments/' + ProjectId), {
            comments: [{messages: [...messagesReducer.messages, inputValue]}],
        }); 

        set(ref(db, 'projectComments/' + 'CommentsId/' + ProjectId + '/' + messagesReducer.messages.length), {
            commentsId: {[messagesReducer.messages.length]: 
                {
                    id: messagesReducer.messages.length,
                    profileImg: userImg || '',
                    timestamp: Date.now(),
                    email: email
                }
            }
        })
    }
    
    const setMessagesMenuOpenFunction = ({id}: {id: number}) => {
        const newMessages = messagesReducer?.id[ProjectId]?.[id].commentsId;
        
        setMessagesMenuOpen({id: messagesMenuOpen.id === newMessages?.[id].id ? null : newMessages?.[id].id, open: true});
    }

    const EditMessage = () => {
        const currentMessage = messagesReducer.messages[Number(messagesMenuOpen.id)]

        setEditInputValue(currentMessage)
        
        setEditPage(true);
    }

    const closeEditMenu = () => {
        setEditPage(false);
    }

    // const DeleteMessage = () => {
    //     try {
    //         remove(ref(db, 'projectComments/' + ProjectId + '/' + 'comments/' + '0/' + 'messages/' + Number(messagesMenuOpen.id))).then(() => {
    //             remove(ref(db, 'projectComments/' + 'CommentsId/' + ProjectId + '/' + Number(messagesMenuOpen.id))).then(() => {
    //                 const ids = messagesReducer.id[ProjectId];
    //                 const filtredIds = ids.commentsId[0].id = 0;

    //                 ReducerDispatch({
    //                     type: 'message',
    //                     messages: messagesReducer.messages.splice(messagesMenuOpen.id, 1),
                        
    //                 })

    //                 update(ref(db, 'projectComments/' + String(ProjectId)), {
    //                     messages: messagesReducer.messages
    //                 })

    //                 update(ref(db, 'projectComments/' + 'CommentsId/'), {
    //                     [String(ProjectId)]: filtredIds, 
    //                 })
    //             });
    //         });
    //     } catch (e) {
    //         console.error('Error deleting your message: ', e);
    //         alert('Error deleting your message');
    //     }
    // }
    

    const sendOnClick = async () => {
        if(inputValue && isLogin) {
            let originalMessages: Array<string> = [];

            try {
                originalMessages = [...messagesReducer.messages];
                const currentMessages = messagesReducer.messages || [];

                ReducerDispatch({
                    type: 'message',
                    messages: [...currentMessages, inputValue]
                });
                    
                setComments(ProjectId);
                setInputValue('');
            } catch (error) {
                ReducerDispatch({
                    type: 'message',
                    messages: originalMessages
                });
                console.error("Ошибка отправки:", error);
            }
        }
    }

    return (
        <>
            <div className={styles.CommentsSectionWrapper}>
                <h1>Comments</h1>

                <div className={styles.CommentsSection}>
                    {(messagesReducer.messages || []).length === 0 ? <CommentsEmpty /> : 
                        <div>
                            {(messagesReducer.messages || []).map((message: string, index: number) => {
                                const profileImgPath = messagesReducer.id[ProjectId]?.[index];
                                const profileImg = profileImgPath?.commentsId?.[messagesReducer.messages.indexOf(message)]?.profileImg; 
                                const id = messagesReducer.messages.indexOf(message);
                                    
                                return(
                                    <div className={styles.messageWrapper}>
                                        <img src={profileImg || DefaultUserImg} width={35} height={35} alt="userImg" />
                                        <p key={index} style={{position: 'relative'}}>{message}</p>
                                        <svg onClick={() => setMessagesMenuOpenFunction({id})} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.messageMenu} viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/></svg>

                                        {messagesMenuOpen.open && messagesMenuOpen.id === messagesReducer.messages.indexOf(message) &&
                                                <div className={styles.OpenMessagesMenu}>
                                                    <div className={styles.EditWrapper} onClick={EditMessage}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>
                                                        <span>Edit</span>
                                                    </div>

                                                    {/* <div className={styles.DeleteWrapper} onClick={DeleteMessage}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                                                        <span>Delete</span>
                                                    </div> */}
                                                </div>
                                        }
                                    </div>
                                )
                                })
                            }
                        </div>
                    }

                    <div className={styles.InputWrapper}>
                        <img src={userImg || DefaultUserImg} width={userImg ? 45 : 35} height={userImg ? 45 : 35} alt="userImg" />
                        <input value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} type="text" placeholder="Type your comment..." />
                        <div onClick={sendOnClick} className={styles.Send}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/></svg></div>
                    </div>
                </div>
            </div>

            {editPage && <EditPage closeEditMenu={closeEditMenu} inputRef={inputRef} editInputValue={editInputValue} EditMessageFunction={EditMessageFunction} setEditInputValue={(e: string) => setEditInputValue(e)} />}
        </>
    )
}

export default FullCardCommentsSection;
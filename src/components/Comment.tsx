import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

    const [clapCount, setClapCount] = useState(0);
    
    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleClapComment() {
        setClapCount((state) => {
            return state + 1
        });
    }

    return (
        <div className={styles.comment}>

            <Avatar src="https://github.com/maykbrito.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Bruno Gayet</strong>
                            <time 
                                title="May 11th at 08:13am"
                                dateTime="2022-05-11 08:13:30"
                            >
                                About 1h ago
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title="Delete publish">
                            <Trash size={24} />
                        </button>
                        
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleClapComment}>
                        <ThumbsUp />
                        Clap <span>{clapCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
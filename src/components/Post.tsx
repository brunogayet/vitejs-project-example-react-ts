import { format, formatDistanceToNow } from 'date-fns';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
    
    const [comments, setComments] = useState([
        'Test post comment!'
    ]);
    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "MMM do 'at' HH:mmaaa");
    
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        addSuffix: true
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    
                    <Avatar hasBorder src={author.avatarUrl} />
                    
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time 
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    content.map(line => {
                        
                        switch(line.type) {
                            case 'paragraph':
                                return <p key={line.content}>{line.content}</p>;
                            case 'link':
                                return <p key={line.content}><a href="#">{line.content}</a></p>;
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Send your feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Write your feedback here"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publish</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return (
                            <Comment 
                                key={comment} 
                                content={comment} 
                                onDeleteComment={deleteComment}
                            />
                        )
                    })
                }
            </div>

        </article>
    );
}
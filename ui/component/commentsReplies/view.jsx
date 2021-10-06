// @flow
import * as ICONS from 'constants/icons';
import Button from 'component/button';
import Comment from 'component/comment';
import React from 'react';
import Spinner from 'component/spinner';

type Props = {
  fetchedReplies: Array<any>,
  unresolvedReplies: Array<string>,
  uri: string,
  parentId: string,
  claimIsMine: boolean,
  myChannels: ?Array<ChannelClaim>,
  linkedCommentId?: string,
  userCanComment: boolean,
  threadDepth: number,
  numDirectReplies: number, // Total replies for parentId as reported by 'comment[replies]'. Includes blocked items.
  isFetchingByParentId: { [string]: boolean },
  hasMore: boolean,
  supportDisabled: boolean,
  doResolveUris: (Array<string>) => void,
  onShowMore?: () => void,
};

function CommentsReplies(props: Props) {
  const {
    uri,
    parentId,
    fetchedReplies,
    unresolvedReplies,
    claimIsMine,
    myChannels,
    linkedCommentId,
    userCanComment,
    threadDepth,
    numDirectReplies,
    isFetchingByParentId,
    hasMore,
    supportDisabled,
    doResolveUris,
    onShowMore,
  } = props;

  const [isExpanded, setExpanded] = React.useState(true);

  // Batch resolve reply channel urls
  React.useEffect(() => {
    if (unresolvedReplies && unresolvedReplies.length > 0) doResolveUris(unresolvedReplies);
  }, [unresolvedReplies, doResolveUris]);

  return !numDirectReplies ? null : (
    <div className="comment__replies-container">
      {!isExpanded ? (
        <div className="comment__actions--nested">
          <Button
            className="comment__action"
            label={__('Show Replies')}
            onClick={() => setExpanded(!isExpanded)}
            icon={isExpanded ? ICONS.UP : ICONS.DOWN}
          />
        </div>
      ) : (
        <div>
          <div className="comment__replies">
            <Button className="comment__threadline" aria-label="Hide Replies" onClick={() => setExpanded(false)} />

            <ul className="comments--replies">
              {fetchedReplies &&
                fetchedReplies.map((comment) => {
                  return (
                    <Comment
                      threadDepth={threadDepth}
                      uri={uri}
                      authorUri={comment.channel_url}
                      author={comment.channel_name}
                      claimId={comment.claim_id}
                      commentId={comment.comment_id}
                      key={comment.comment_id}
                      message={comment.comment}
                      timePosted={comment.timestamp * 1000}
                      claimIsMine={claimIsMine}
                      commentIsMine={
                        comment.channel_id &&
                        myChannels &&
                        myChannels.some(({ claim_id }) => claim_id === comment.channel_id)
                      }
                      linkedCommentId={linkedCommentId}
                      commentingEnabled={userCanComment}
                      supportAmount={comment.support_amount}
                      numDirectReplies={comment.replies}
                      isModerator={comment.is_moderator}
                      isGlobalMod={comment.is_global_mod}
                      supportDisabled={supportDisabled}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      {isExpanded && fetchedReplies && hasMore && (
        <div className="comment__actions--nested">
          <Button
            button="link"
            label={__('Show more')}
            onClick={() => (onShowMore ? onShowMore() : null)}
            className="button--uri-indicator"
          />
        </div>
      )}
      {isFetchingByParentId[parentId] && (
        <div className="comment__replies-container">
          <div className="comment__actions--nested">
            <Spinner type="small" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsReplies;

import { connect } from 'react-redux';
import { makeSelectClaimIsMine, selectMyChannelClaims, makeSelectClaimForUri, doResolveUris } from 'lbry-redux';
import { selectIsFetchingCommentsByParentId, makeSelectRepliesForParentId } from 'redux/selectors/comments';
import { selectUserVerifiedEmail } from 'redux/selectors/user';
import CommentsReplies from './view';

const select = (state, props) => {
  const fetchedReplies = makeSelectRepliesForParentId(props.parentId)(state);
  const unresolvedReplies =
    fetchedReplies &&
    fetchedReplies
      .map(({ channel_url }) => makeSelectClaimForUri(channel_url)(state) === undefined && channel_url)
      .filter((url) => url !== false);

  return {
    fetchedReplies,
    unresolvedReplies,
    claimIsMine: makeSelectClaimIsMine(props.uri)(state),
    userCanComment: IS_WEB ? Boolean(selectUserVerifiedEmail(state)) : true,
    myChannels: selectMyChannelClaims(state),
    isFetchingByParentId: selectIsFetchingCommentsByParentId(state),
  };
};

export default connect(select, { doResolveUris })(CommentsReplies);

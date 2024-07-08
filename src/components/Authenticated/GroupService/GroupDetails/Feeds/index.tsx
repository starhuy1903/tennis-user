import EditNoteIcon from '@mui/icons-material/EditNote';
import { Fab, Grid, Pagination, Stack, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { ModalKey } from 'constants/modal';
import { useGetPostsQuery } from 'store/api/group/postApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { showModal } from 'store/slice/modalSlice';
import { GroupPost } from 'types/group-post';

import FeedItem from './FeedItem';

export default function Feeds() {
  const dispatch = useAppDispatch();

  const groupData = useAppSelector(selectGroup);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetPostsQuery({
    page,
    take: 5,
    groupId: groupData.id,
  });

  useEffect(() => {
    refetch();

    window.scrollTo({
      top: 560,
      behavior: 'smooth',
    });
  }, [page, refetch]);

  const handleCreatePost = useCallback(() => {
    dispatch(
      showModal(ModalKey.CREATE_POST, {
        groupId: groupData.id,
        onSuccess: refetch,
      })
    );
  }, [dispatch, groupData.id, refetch]);

  const handleUpdatePost = useCallback(
    (post: GroupPost) => {
      dispatch(
        showModal(ModalKey.UPDATE_POST, {
          groupId: groupData.id,
          post,
          onSuccess: refetch,
        })
      );
    },
    [dispatch, groupData.id, refetch]
  );

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Grid
      container
      sx={{
        paddingBottom: 8,
      }}
    >
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h5">{`${data?.totalCount} posts`}</Typography>

          <Tooltip title="Create post">
            <Fab
              size="medium"
              color="primary"
              onClick={handleCreatePost}
            >
              <EditNoteIcon />
            </Fab>
          </Tooltip>
        </Stack>

        {data && data.data.length > 0 ? (
          <>
            {data.data.map((post) => (
              <FeedItem
                key={post.id}
                post={post}
                refetch={refetch}
              />
            ))}

            <Pagination
              count={data?.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </>
        ) : (
          <NoData message="There is no post in this group." />
        )}
      </Grid>
      <Grid
        item
        xs={0}
        md={4}
      ></Grid>
    </Grid>
  );
}

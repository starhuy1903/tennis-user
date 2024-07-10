import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ListItemIcon, ListItemText, MenuList } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useConfirm } from 'material-ui-confirm';
import * as React from 'react';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { useDeletePostMutation } from 'store/api/group/postApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { showModal } from 'store/slice/modalSlice';
import { selectUser } from 'store/slice/userSlice';
import { GroupPost } from 'types/group-post';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

const displayDate = (date: string) => {
  return displayDateTime({
    dateTime: date,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

const MoreMenu = ({ post, refetch }: { post: GroupPost; refetch: () => void }) => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const groupData = useAppSelector(selectGroup);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdatePost = useCallback(() => {
    dispatch(
      showModal(ModalKey.UPDATE_POST, {
        groupId: groupData.id,
        post,
        onSuccess: refetch,
      })
    );
    handleCloseMenu();
  }, [dispatch, groupData.id, post, refetch]);

  const handleDeletePost = useCallback(() => {
    confirm({
      title: 'Confirm delete post',
      description: 'Are you sure you want to delete this post? This action cannot be undone.',
      confirmationText: 'Delete',
      confirmationButtonProps: {
        color: 'error',
      },
    }).then(async () => {
      try {
        await deletePost({
          groupId: groupData.id,
          postId: post.id,
        }).unwrap();

        showSuccess('Deleted post successfully.');
        handleCloseMenu();
        await refetch();
      } catch (error) {
        // handled error
      }
    });
  }, [confirm, deletePost, groupData.id, post.id, refetch]);

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpenMenu}
      >
        <MoreHorizIcon color={anchorEl ? 'primary' : 'inherit'} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={handleCloseMenu}
      >
        <MenuList
          disablePadding
          sx={{ minWidth: '150px' }}
        >
          <MenuItem
            onClick={handleUpdatePost}
            disabled={isLoading}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Edit post</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleDeletePost}
            disabled={isLoading}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Delete post</Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default function FeedItem({ post, refetch }: { post: GroupPost; refetch: () => void }) {
  const user = useAppSelector(selectUser);

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={post.user.image}
            alt={post.user.name}
          />
        }
        action={
          user &&
          user.id === post.userId && (
            <MoreMenu
              post={post}
              refetch={refetch}
            />
          )
        }
        title={post.user.name}
        subheader={displayDate(post.createdAt)}
      />
      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace="pre-line"
        >
          {post.content}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={post.image}
        alt="Post image"
      />
    </Card>
  );
}

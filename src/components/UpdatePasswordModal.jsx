/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  FormLabel,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useUpdatePassword } from '../lib/react-query/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '../lib/zod/validations';
import { useTheme } from '@emotion/react';

const UpdatePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(updatePasswordSchema) });
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  const onSubmit = async (data) => {
    await updatePassword(data);
    handleClose();
    reset();
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Change Password</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
            <Typography sx={{ mb: 1 }} variant='h6' component='h2'>
              Update Password
            </Typography>
            <Divider />
            <FormLabel sx={{ my: 2 }}>Current Password</FormLabel>
            <TextField
              {...register('currentPassword')}
              size='small'
              type='password'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a' || e.key === 'Tab') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.currentPassword && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.currentPassword.message}
              </Typography>
            )}
            <FormLabel sx={{ my: 2 }}>New Password</FormLabel>
            <TextField
              {...register('newPassword')}
              size='small'
              type='password'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a' || e.key === 'Tab') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.newPassword && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.newPassword.message}
              </Typography>
            )}
            <FormLabel sx={{ my: 2 }}>Confirmation Password</FormLabel>
            <TextField
              {...register('confirmationPassword')}
              size='small'
              type='password'
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a' || e.key === 'Tab') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.confirmationPassword && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.confirmationPassword.message}
              </Typography>
            )}
            <Button
              sx={{ alignSelf: 'start', mt: 2 }}
              type='submit'
              variant='contained'
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update password'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;

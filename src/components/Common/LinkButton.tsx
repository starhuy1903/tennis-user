import Button, { ButtonProps } from '@mui/material/Button';
import { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { ForwardRefExoticComponent, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

interface LinkButtonProps {
  to: To;
  children: ReactNode;
  linkOptions?: ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  buttonProps?: ButtonProps;
}

const CustomLink = styled(Link)(() => ({
  width: '100%',
  color: 'inherit',
  textDecoration: 'none',
  padding: '6px 16px',
}));

const LinkButton = ({ to, children, linkOptions, buttonProps }: LinkButtonProps) => {
  return (
    <Button
      {...buttonProps}
      sx={{ padding: 0, ...buttonProps?.sx }}
    >
      <CustomLink
        to={to}
        {...linkOptions}
      >
        {children}
      </CustomLink>
    </Button>
  );
};

export default LinkButton;

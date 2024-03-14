import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BreadCrumb({
  breadcrumbs,
}: {
  breadcrumbs: {
    title: string;
    to: string;
    active: boolean;
  }[];
}) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs.map((item, index) => {
        if (item.active) {
          return (
            <Link
              key={index}
              to={item.to}
              style={{
                color: 'gray',
                fontWeight: 500,
              }}
              className="breadcrumb-link"
            >
              {item.title}
            </Link>
          );
        } else {
          return (
            <Typography
              key={index}
              color="text.primary"
              fontWeight={500}
            >
              {item.title}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
}

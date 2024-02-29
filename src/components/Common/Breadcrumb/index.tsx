import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BreadCrumb({
  breadcrumbs,
}: {
  breadcrumbs: {
    title: string;
    to: string;
  }[];
}) {
  const items = breadcrumbs.map((item, index) => {
    if (index < breadcrumbs.length - 1) {
      return (
        <Link
          key={index}
          to={item.to}
          style={{
            color: 'gray',
          }}
          className="breadcrumb-link"
        >
          {item.title}
        </Link>
      );
    }
    return (
      <Typography
        key={index}
        color="text.primary"
      >
        {item.title}
      </Typography>
    );
  });

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {items}
    </Breadcrumbs>
  );
}

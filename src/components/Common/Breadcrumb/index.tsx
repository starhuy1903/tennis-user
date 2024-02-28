import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '@mui/material';

export default function BreadCrumb({ breadcrumbs }: { breadcrumbs: JSX.Element[] }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

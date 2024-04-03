import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

import CustomLink from 'components/Common/CustomLink';
import { BoughtPackage } from 'types/boughtPackage';
import { ScrollbarStyle } from 'utils/style';

import Package from './Package';

interface PackageSelectorProps {
  selected: string | null;
  handleSelect: () => void;
  packages: Array<BoughtPackage>;
}

const PackageSelector = ({ selected, handleSelect, packages }: PackageSelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(selected);

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>Your selected package</FormLabel>
        <Package
          selected={true}
          handleSelect={() => {}}
          data={packages.find((e) => selectedItem === e.id)!}
        />
        <Button
          variant="outlined"
          startIcon={<PanToolAltIcon />}
          sx={{ marginTop: '10px' }}
          onClick={() => setOpen(true)}
        >
          Change package
        </Button>
      </FormControl>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>Pick a package</DialogTitle>
        <DialogContent sx={{ ...ScrollbarStyle }}>
          <DialogContentText>
            The created group will be connected to selected package. Choose a package that you own below or checkout one
            of our available packages <CustomLink to="/pricing">here</CustomLink>.
          </DialogContentText>
          <Grid
            container
            spacing="15px"
            padding="15px"
          >
            {packages.map((e) => (
              <Grid
                key={e.id}
                xs={12}
                md={6}
                xl={4}
              >
                <Package
                  selected={selectedItem === e.id}
                  handleSelect={() => setSelectedItem(e.id)}
                  data={e}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', columnGap: '10px' }}>
          {/* <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button> */}
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PackageSelector;

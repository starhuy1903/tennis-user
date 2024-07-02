import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link as LinkMUI, Typography } from '@mui/material';

function AccordionData({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Accordion sx={{ py: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography
          variant="h6"
          fontWeight={500}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant="body1"
          fontWeight={400}
        >
          {children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function FAQ() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
      >
        Frequently Asked Questions
      </Typography>

      <Typography
        variant="body1"
        fontWeight={400}
        textAlign="center"
        my={2}
      >
        Find answers to common questions about our platform.
      </Typography>

      <Box>
        <AccordionData title="Are there fees to use the platform?">
          The platform is completely free to use. You can easily join groups or participate in open tournaments. For
          users with more advanced needs, we offer specialized service packages tailored for tennis groups, organizers,
          and affiliated entities.
        </AccordionData>
        <AccordionData title="How can I join a tournament?">
          To join a tournament, you need to sign up on the platform and then navigate to the <b>Tournament Service</b>.
          The application will show the list of tournaments, click on the <b>"Register"</b> button to register for a
          tournament.
        </AccordionData>
        <AccordionData title="How can I create a group?">
          To create a group, you need to sign up on the platform and then navigate to the <b>Group Service</b>, then
          click on the <b>"Create Group"</b> button and fill in the required information to create a group.
          <br />
          <br />
          <Typography
            variant="body1"
            fontWeight={400}
            color="error"
          >
            Note: You need to purchase a package to create a group.
          </Typography>
        </AccordionData>
        <AccordionData title="What are the differences between group tournaments and open tournaments?">
          <b>Group tournaments</b> are privately organized within specific tennis groups, supporting Knockout and
          Roun-Robin formats with Singles participation. There are no specific gender or age requirements, and members
          can be added by group admin without registration.
          <br />
          <br />
          <b>Open tournaments</b> are publicly accessible on the platform, allowing anyone to register. They offer a
          wider range of features, including Knockout, Round-Robin, and Group Playoffs for both Singles and Doubles.
          Open tournaments may have specific gender and age criteria, and participants must register. They also feature
          live scoring and maintain standings.
        </AccordionData>
        <AccordionData title="How does the ELO rating system benefit players on your platform?">
          The <b>ELO</b> rating system tracks player skill levels based on match results, providing accurate rankings
          for fair competition. Our platform uses ELO to ensure balanced matchups in tournaments, enhancing the overall
          experience for players seeking competitive tennis matches.
        </AccordionData>
        <AccordionData title="How secure is my personal information on the platform?">
          We take the security and privacy of your personal information seriously. Our platform employs
          industry-standard security measures and encryption protocols to safeguard your data.
        </AccordionData>
        <AccordionData title="How can I contact customer support if I have further questions?">
          If you have any questions or need assistance, you can reach out to our customer support team through our
          contact page or directly via email at{' '}
          <LinkMUI
            href="mailto: support@tennis.com"
            sx={{
              'color': 'primary.main',
              'fontWeight': 'bold',
              'textDecoration': 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            support@tennis.com
          </LinkMUI>
          . We are here to help you with any inquiries you may have.
        </AccordionData>
      </Box>
    </Box>
  );
}

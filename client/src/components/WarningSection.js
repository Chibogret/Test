import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'; // Ensure axios is installed

const titleCase = (text) => {
    return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const theme = createTheme({
    components: {
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#ddd', // General text color for list items
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#444', // Default text color for Typography components
                },
                body1: {
                    color: '#555', // Specific color for body1 variant
                },
                h6: {
                    color: '#D32F2F', // Color for headers
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f9f9f9', // Background color for Paper components
                },
            },
        },
    },
});

const WarningSection = ({ details, _id }) => {
    const IP_ADR = process.env.REACT_APP_IP_ADR;
    const { numberOfHeads, timeline } = details;

    const warnings = timeline.map((checkpoint, index) => {
        let warning = null;
        const checkpointName = titleCase(checkpoint.name);
        if (checkpoint.status.includes("completed (skipped)")) {
            warning = `${checkpointName} was skipped.`;
        } else if (!["current", "pending"].includes(checkpoint.status) && checkpoint.checkedby && checkpoint.time && checkpoint.currentHeads !== numberOfHeads) {
            warning = `Discrepancy at ${checkpointName} checkpoint: Expected ${numberOfHeads}, found ${checkpoint.currentHeads}.`;
        }
        return warning && (
            <ListItem key={index} style={{ backgroundColor: warning.includes('skipped') ? '#f9f9f9' : '#ffc2c2 '}}>
                <ListItemText primary={warning} />
            </ListItem>
        );
    }).filter(Boolean);

    const skippedWarnings = warnings.filter(warning => warning.props.children.props.primary.includes('skipped'));
    const skippedCount = skippedWarnings.length;
    const warningCount = warnings.length;

    useEffect(() => {
        const updateWarningCount = async () => {
            try {
                await axios.put(`http://${IP_ADR}:5000/api/shipments/warning/${_id}`, { warning: warningCount });
            } catch (error) {
                console.error('Error updating warning count:', error);
            }
        };

        updateWarningCount();
    }, [warningCount, _id]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                {warnings.length > 0 ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Warning(s):
                        </Typography>
                        <List>
                            {warnings.filter(warning => !warning.props.children.props.primary.includes('skipped'))}
                            {skippedCount > 0 && (
                                <Accordion style={{ marginTop: "5px" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{`Skipped Checkpoints: ${skippedCount}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {skippedWarnings}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </List>
                    </>
                ) : (
                    <Typography variant="body1">No issues detected.</Typography>
                )}
            </div>
        </ThemeProvider>
    );
};

export default WarningSection;

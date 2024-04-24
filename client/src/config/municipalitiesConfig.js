export const municipalities = [
    { id: '1', name: 'Puerto Galera', coords: [13.501690, 120.955101] },
    { id: '2', name: 'San Teodoro', coords: [13.436960, 121.020430] },
    { id: '3', name: 'Baco', coords: [13.358900, 121.097510] },
    { id: '4', name: 'Calapan City', coords: [13.413040, 121.180480] },
    { id: '5', name: 'Naujan', coords: [13.263306, 121.264316] },
    { id: '6', name: 'Victoria', coords: [13.174530, 121.277529] },
    { id: '7', name: 'Socorro', coords: [13.055952, 121.407822] },
    { id: '8', name: 'Pola', coords: [13.129481621569637, 121.43258894087441] },
    { id: '9', name: 'Pinamalayan', coords: [13.040283928914839, 121.47715603013457] },
    { id: '10', name: 'Gloria', coords: [12.97204719205446, 121.4778462161033] },
    { id: '11', name: 'Bansud', coords: [12.865326637011814, 121.45471869564072] },
    { id: '12', name: 'Bongabong', coords: [12.757874522559357, 121.47004524969627] },
    { id: '13', name: 'Roxas', coords: [12.596797290244368, 121.52622127134288] },
    { id: '14', name: 'Mansalay', coords: [12.52197539225643, 121.44135240026867] },
    { id: '15', name: 'Bulalacao', coords: [12.347154157756911, 121.33718759882257] }
    // Add more municipalities as needed
  ];

export const StatusEnum = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    UNDER_MAINTENANCE: 'Under Maintenance'
};

export const OutbreakStatus = {
  NO_CASES: 'No Cases',
  MONITORING: 'Monitoring',
  OUTBREAK: 'Outbreak',
  CONTAINED: 'Contained'
};

export const Severity = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
};
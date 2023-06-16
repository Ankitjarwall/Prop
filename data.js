export default [
    {
        type: 'CHESS',
        imageUri: require('./assets/chess.png'),
        heading: 'Strategic moves',
        description: '"If you find a good move look for a better one."',
        key: 'first',
        color: '#9dcdfa',
        hearts: 2314,
        onField: 24
    },
    {
        type: 'BOARD',
        imageUri: require('./assets/white_board.png'),
        heading: 'Scribble ideas',
        description:
            'An empty board is the best place to start afresh.',
        key: 'third',
        color: '#999',
        hearts: 3657,
        onField: 67
    },
    {
        type: 'CANVAS',
        imageUri: require('./assets/canvasbg.png'),
        heading: 'Creative canvas',
        description:
            "One can speak poetry just by arranging colors well.",
        key: 'fourth',
        color: '#a1e3a1',
        hearts: 1342,
        onField: 17
    },
    {
        type: 'PROJECTOR',
        imageUri: require('./assets/projector.png'),
        heading: 'Great movies',
        description: "Get busy livin' or get busy dying.",
        key: 'second',
        color: '#db9efa',
        hearts: 6534,
        onField: 112
    },
];
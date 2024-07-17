import { styled } from '@mui/system';

export const StyledInputRoot = styled('div')({
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 400,
  color: '#a18377',
  display: 'flex',
  flexDirection: 'column', // Updated to column layout
  alignItems: 'center',
});

export const StyledInput = styled('input')({
  fontSize: '0.85rem',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 1,
  color: '#a18377',
  background: '#eae3e1',
  border: '1px solid #a18377',
  boxShadow: 'rgba(0,0,0,0.05)',
  borderRadius: '10px',
  margin: '0 8px',
  padding: '10px 12px',
  outline: 0,
  minWidth: 0,
  width: '3.5rem',
  textAlign: 'center',
  position: 'relative',
  pointerEvents: 'visible', // Prevents spinners from blocking input interaction

  '&:hover': {
    borderColor: '#a18377',
  },

  '&:focus': {
    borderColor: '#a18377',
    boxShadow: '0 0 0 1px rgba(161, 131, 119, 0.5)',
  },

  // Styling the input spinners (arrows)
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    backgroundColor: '#eae3e1', // Background color for spinners
    width: '1.5rem', // Adjust width of spinners
    height: '100%', // Full height of input
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer', // Show cursor on hover
    color: '#a18377',

    // Create triangle-shaped spinners using CSS borders
    '&::before': {
      backgroundColor: '#eae3e1', // Background color for spinner triangles
      content: "''",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      width: 0,
      height: 0,
      borderLeft: '6px solid #a18377',
      borderRight: '6px solid #a18377',
      borderBottom: '6px solid #a18377',
    },
  },
});

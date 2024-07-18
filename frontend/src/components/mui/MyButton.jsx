import Button from '@mui/material/Button';

export default function MyButton(props) {
    const {label,type} = props
  return (
      <Button variant="contained" type={type} color="secondary" className={'myButton'} sx={{width:'100%',height:'100%'}}>{label} </Button>
  );
}
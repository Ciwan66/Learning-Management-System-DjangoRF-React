import TextField from "@mui/material/TextField";
import '../../App.css'
import {Controller} from 'react-hook-form'

export default function MyTextField(props) {
  const {name, label , control ,height} = props;
  return (
    <Controller 
    name={name}
    control={control}
    render={({
      field : {onChange,value},
      fieldState : {error},
      formState,
    })=>(
      <TextField 
      id="outlined-basic" 
      label={label} 
      variant="outlined" 
      className={"myForm"}
      value={value}
      onChange={onChange}
      error={!!error}
      sx={{width:'100%',
        '& .MuiInputBase-root':{
        height:height}}}
      helperText={error?.message}
      />
  )}
   />
  )

  
  ;
}
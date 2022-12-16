// ** React Imports
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
// import { doc, getDoc } from "firebase/firestore";
import { db, collection, query, where, getDocs  } from '../../firebase'
// import {  } from "firebase/firestore";


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userdata, setUserdata] = useState(null);

  const selectCountryHandler = (value) => setSelectedCountry(value);
  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);
  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });

  useEffect(() => { 

    const getUserdata = async () =>{

     // Create a reference to the cities collection
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(userRef, where("uid", "==", "lh9EUpWNAFN08hsXfNt4SrJx1lw2"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

      let data = doc.data();
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        setUserdata({ 
            name:data.name,
            email:data.email,
            phoneNumber:data.phoneNumber,
            country:data.country,
            company:data.company,
            businessType:data.businessType,
        }) 


      });


      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log("No such document!");
      // }

        // setUserdata({ 
        //     name:user.name,
        //     email:user.email,
        //     phone:user.phone,
        // }) 
    }
    getUserdata();

}, []);

  useEffect(() => {

    reset(userdata);

}, [userdata]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    name: Yup.string()
    .required('First Name is required'),
    phoneNumber: Yup.string()
    .required('First Name is required'),
    country: Yup.string()
        .required('Country is required')
});
const formOptions = { resolver: yupResolver(validationSchema) };

const { register, handleSubmit, formState, reset } = useForm(formOptions);
const { errors } = formState;

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

async function onSubmit(data) {
  const userinfo = result.response.user;
  AddExtraDetails(userinfo);
  updateProfile(auth.currentUser, {
    phoneNumber: mynumber
  }).then(() => {
    console.log('User details Updated')
  }).catch((error) => {
    console.log('User details update err :',error)
  });
}
  

  const AddExtraDetails = async (data) =>{
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid:data.uid,
        name: phoneNumber
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }

  return (
    <CardContent>
       {userdata &&
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                {/* <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography> */}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            fullWidth 
            label='Phone Number' 
            name="phoneNumber" 
            disabled 
            placeholder='Phone Number' 
            // defaultValue='Phone Number'
            {...register('phoneNumber')} className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              name='email'
              label='Email'
              placeholder=''
              defaultValue=''
              {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback" style={{color:'red', fontSize:'14px'}}>{errors.email?.message}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            fullWidth 
            label='Name'
            type="text"
            defaultValue=''
            {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' name='company' {...register('company')} className={`form-control ${errors.company ? 'is-invalid' : ''}`}/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {/* <InputLabel>Country</InputLabel> */}
              {/* <Select  name='country' 
              {...register('country')} className={`form-control ${errors.country ? 'is-invalid' : ''}`} >
              {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                <MenuItem key={label} value={label}>{label}</MenuItem>
                ))}
              </Select> */}
               <select defaultValue='' style={{height: '55px', border: 'solid 1px #c4c4c4', borderRadius:'4px'}} name="country" {...register('country')} className={`form-control ${errors.country ? 'is-invalid' : ''}`} >
                {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                <option key={label} value={label}>{label + '-' +value }</option>
                ))}
                </select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {/* <InputLabel>Type of Business</InputLabel> */}
              <select defaultValue='' label='Type of Business' style={{height: '55px', border: 'solid 1px #c4c4c4', borderRadius:'4px'}} name="businessType" {...register('businessType')} className={`form-control ${errors.businessType ? 'is-invalid' : ''}`} >
                <option value='manufacturer'>Manufacturer / OEM</option>
                <option value='importer'>Importer / Bying Agent</option>
                <option value='exporter'>Exporter / Supplier</option>
                <option value='service'>Service Provider</option>
              </select>
            </FormControl>
          </Grid>
          

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      }
    </CardContent>
  )
}

export default TabAccount

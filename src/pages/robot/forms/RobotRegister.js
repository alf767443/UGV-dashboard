import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { djangoFetch } from 'API/url';



// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    // Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import { random, round } from 'lodash';

// ============================|| FIREBASE - REGISTER ||============================ //

const RobotRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    robotname: '',
                    projectname: '',
                    robot: '',
                    database: '',
                    ssh: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    robotname: Yup.string().min(2).max(255).required('Robot name is required'),
                    projectname: Yup.string().min(2).max(255).required('Project is required'),
                    database: Yup.string().min(2).max(255).required('Database name is required'),
                    robot: Yup.string().min(2).max(255).required('Robot ID is required'),
                    password: Yup.string().min(4).max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(true);

                        var sendJSON = {}
                        djangoFetch('/robot', '/?name=default', 'GET', '')
                            .then((response) => response.json())
                            .then((json) => {
                                const _json = json
                                sendJSON = _json
                                console.log(sendJSON)
                                delete sendJSON._id
                                sendJSON.long_name = values.robotname
                                sendJSON.project = values.projectname
                                sendJSON.database = values.database
                                sendJSON.ssh = values.ssh
                                sendJSON.password = values.password
                                sendJSON.robot = values.robot

                                djangoFetch('/robot', '/', 'POST', JSON.stringify(sendJSON))
                                    .then((response) => {
                                        if(response.status === 201){
                                            window.location.href = '/CeDRI_dashboard/robot/login';
                                            setStatus({ success: true });
                                            setSubmitting(false);
                                        }
                                    })
                                    .catch((e) => console.error(e))
                            })

                    } catch (err) {
                        //console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="robotname-signup">Robot Name*</InputLabel>
                                    <OutlinedInput
                                        id="robotname-login"
                                        type="robotname"
                                        value={values.robotname}
                                        name="robotname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="The Big Blue"
                                        fullWidth
                                        error={Boolean(touched.robotname && errors.robotname)}
                                    />
                                    {touched.robotname && errors.robotname && (
                                        <FormHelperText error id="helper-text-robotname-signup">
                                            {errors.robotname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="projectname-signup">Project Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.projectname && errors.projectname)}
                                        id="projectname-signup"
                                        type="projectname"
                                        value={values.projectname}
                                        name="projectname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="CeDRI AMR Robot"
                                        inputProps={{}}
                                    />
                                    {touched.projectname && errors.projectname && (
                                        <FormHelperText error id="helper-text-projectname-signup">
                                            {errors.projectname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="database-signup">Database name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.database && errors.database)}
                                        id="database-login"
                                        type="database"
                                        value={values.database}
                                        name="database"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder='Big_Blue_CeDRI_AMR'
                                        inputProps={{}}
                                    />
                                    {touched.database && errors.database && (
                                        <FormHelperText error id="helper-text-database-signup">
                                            {errors.database}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="ssh-signup">SSH key</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.ssh && errors.ssh)}
                                        id="ssh-signup"
                                        value={values.ssh}
                                        name="ssh"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="ssh-rsa"
                                        inputProps={{}}
                                    />
                                    {touched.ssh && errors.ssh && (
                                        <FormHelperText error id="helper-text-ssh-signup">
                                            {errors.ssh}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="robot-signup">Robot nickname*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.robot && errors.robot)}
                                        id="robot-login"
                                        type="robot"
                                        value={values.robot}
                                        name="robot"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder='bigCedri'
                                        inputProps={{}}
                                    />
                                    {touched.robot && errors.robot && (
                                        <FormHelperText error id="helper-text-robot-signup">
                                            {errors.robot}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create Robot
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography 
                                        variant="body1"
                                        sx={{ textDecoration: 'none' }}
                                        color="primary"
                                        component={RouterLink} 
                                        to="/robot/login"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Sign up with a robot
                                    </Typography>
                                </Divider>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default RobotRegister;

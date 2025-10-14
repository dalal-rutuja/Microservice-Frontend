
// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Eye, EyeOff, Shield, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
// import { motion, useInView } from 'framer-motion';
// import PublicLayout from '../../layouts/PublicLayout';
// import { useAuth } from '../../context/AuthContext';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const formRef = useRef(null);
//   const isInView = useInView(formRef, { once: true });

//   const validateEmail = (email) => {
//     if (!email) return 'Email is required.';
//     if (!/\S+@\S+\.\S+/.test(email)) return 'Email address is invalid.';
//     return '';
//   };

//   const validatePassword = (password) => {
//     if (!password) return 'Password is required.';
//     return '';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Real-time validation feedback
//     if (name === 'email') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         email: validateEmail(value),
//       }));
//     } else if (name === 'password') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: validatePassword(value),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const emailError = validateEmail(formData.email);
//     const passwordError = validatePassword(formData.password);

//     setErrors({
//       email: emailError,
//       password: passwordError,
//     });

//     if (emailError || passwordError) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const result = await login(formData.email, formData.password);

//       if (result.success) {
//         toast.success('Login successful!');
//         setLoginSuccess(true);
//         navigate('/dashboard');
//       } else {
//         toast.error(result.message || 'Login failed.');
//       }
//     } catch (error) {
//       if (loginSuccess) {
//         return;
//       }
//       toast.error(error.message || 'An unexpected error occurred. Please try again.');
//       console.error('Unexpected error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 30,
//       scale: 0.95
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94]
//       }
//     }
//   };

//   const formVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 50,
//       rotateX: -15
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       rotateX: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94]
//       }
//     }
//   };

//   const inputVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const glowVariants = {
//     initial: { scale: 1, opacity: 0.7 },
//     animate: {
//       scale: [1, 1.2, 1],
//       opacity: [0.7, 1, 0.7],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <PublicLayout>
//       {/* Animated background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div 
//           className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20"
//           animate={{
//             scale: [1, 1.1, 1],
//             rotate: [0, 180, 360]
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//         <motion.div 
//           className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full blur-3xl opacity-20"
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [360, 180, 0]
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
//         {/* Animated grid background */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }} />
//         </div>

//         <motion.div 
//           ref={formRef}
//           className="max-w-md w-full space-y-8 relative z-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? "visible" : "hidden"}
//         >
//           {/* Form container with glassmorphism effect */}
//           <motion.div 
//             className="relative p-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
//             variants={formVariants}
//           >
//             {/* Animated border glow */}
//             <motion.div 
//               className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl blur-sm opacity-0"
//               animate={{
//                 opacity: [0, 0.3, 0]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />

//             {/* Header section */}
//             <motion.div 
//               className="text-center"
//               variants={itemVariants}
//             >
//               {/* Logo with glow effect */}
//               <motion.div 
//                 className="relative inline-flex items-center justify-center mb-6"
//                 variants={itemVariants}
//               >
//                 <motion.div 
//                   className="absolute w-20 h-20 bg-gray-700 rounded-2xl blur-md opacity-20"
//                   variants={glowVariants}
//                   initial="initial"
//                   animate="animate"
//                 />
//                 <motion.div 
//                   className="relative w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center"
//                   whileHover={{ 
//                     scale: 1.05,
//                     rotate: [0, -5, 5, 0],
//                     transition: { duration: 0.3 }
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Shield className="w-8 h-8 text-white" />
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
//                     animate={{
//                       opacity: [0, 0.3, 0]
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: "easeInOut"
//                     }}
//                   />
//                 </motion.div>
//               </motion.div>

//               <motion.h2 
//                 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-2"
//                 variants={itemVariants}
//               >
//                 Welcome Back
//               </motion.h2>
              
//               <motion.p 
//                 className="text-gray-600 mb-8"
//                 variants={itemVariants}
//               >
//                 Or{' '}
//                 <Link 
//                   to="/register" 
//                   className="font-medium text-gray-700 hover:text-gray-800 relative group"
//                 >
//                   <span className="relative z-10">create a new account</span>
//                   <motion.div 
//                     className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:w-full transition-all duration-300"
//                   />
//                 </Link>
//               </motion.p>
//             </motion.div>

//             {/* Form */}
//             <motion.form 
//               className="space-y-6" 
//               onSubmit={handleSubmit}
//               variants={containerVariants}
//             >
//               {/* Email field */}
//               <motion.div variants={inputVariants}>
//                 <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <motion.div 
//                     className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
//                   </motion.div>
//                   <motion.input
//                     id="email-address"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className={`block w-full pl-10 pr-3 py-3 border ${
//                       errors.email ? 'border-red-500' : 'border-gray-300'
//                     } rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm`}
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     whileFocus={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                   {errors.email && (
//                     <motion.p 
//                       className="mt-2 text-sm text-red-600"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {errors.email}
//                     </motion.p>
//                   )}
//                 </div>
//               </motion.div>

//               {/* Password field */}
//               <motion.div variants={inputVariants}>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <motion.div 
//                     className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
//                   </motion.div>
//                   <motion.input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     autoComplete="current-password"
//                     required
//                     className={`block w-full pl-10 pr-12 py-3 border ${
//                       errors.password ? 'border-red-500' : 'border-gray-300'
//                     } rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm`}
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     whileFocus={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                   <motion.button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       animate={{ rotate: showPassword ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//                       )}
//                     </motion.div>
//                   </motion.button>
//                   {errors.password && (
//                     <motion.p 
//                       className="mt-2 text-sm text-red-600"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {errors.password}
//                     </motion.p>
//                   )}
//                 </div>
//               </motion.div>

//               {/* Forgot password link */}
//               <motion.div 
//                 className="flex items-center justify-end"
//                 variants={inputVariants}
//               >
//                 <Link 
//                   to="#" 
//                   className="text-sm font-medium text-gray-700 hover:text-gray-800 relative group"
//                 >
//                   <span className="relative z-10">Forgot your password?</span>
//                   <motion.div 
//                     className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:w-full transition-all duration-300"
//                   />
//                 </Link>
//               </motion.div>

//               {/* Submit button */}
//               <motion.div variants={inputVariants}>
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading}
//                   className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
//                     initial={{ x: '-100%' }}
//                     whileHover={{ x: '100%' }}
//                     transition={{ duration: 0.6 }}
//                   />
                  
//                   <span className="relative z-10 flex items-center">
//                     {isLoading ? (
//                       <>
//                         <motion.div
//                           className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                         Signing in...
//                       </>
//                     ) : (
//                       <>
//                         Sign in
//                         <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//                       </>
//                     )}
//                   </span>
//                 </motion.button>
//               </motion.div>
//             </motion.form>

//             {/* Floating elements */}
//             <motion.div 
//               className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full opacity-30"
//               animate={{
//                 y: [0, -10, 0],
//                 x: [0, 5, 0]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />
//             <motion.div 
//               className="absolute bottom-4 left-4 w-3 h-3 bg-gray-300 rounded-full opacity-20"
//               animate={{
//                 y: [0, -15, 0],
//                 x: [0, -8, 0]
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 1
//               }}
//             />
//           </motion.div>

//           {/* Additional features hint */}
//           <motion.div 
//             className="text-center"
//             variants={itemVariants}
//           >
//             <motion.p 
//               className="text-sm text-gray-500 flex items-center justify-center"
//               whileHover={{ scale: 1.02 }}
//             >
//               <Sparkles className="w-4 h-4 mr-2" />
//               Secure login with enterprise-grade encryption
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </PublicLayout>
//   );
// };

// export default LoginPage;


// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Eye, EyeOff, Shield, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
// import { motion, useInView } from 'framer-motion';
// import PublicLayout from '../../layouts/PublicLayout';
// import { useAuth } from '../../context/AuthContext';

// const LoginPage = () => {
//  const [formData, setFormData] = useState({
//  email: '',
//  password: '',
//  });

//  const [errors, setErrors] = useState({});
//  const [showPassword, setShowPassword] = useState(false);
//  const [loginSuccess, setLoginSuccess] = useState(false);
//  const [isLoading, setIsLoading] = useState(false);
//  const [showOtpField, setShowOtpField] = useState(false);
//  const [otp, setOtp] = useState('');
//  const [otpEmail, setOtpEmail] = useState(''); // To store the email for OTP verification

//  const navigate = useNavigate();
//  const { login, verifyOtp } = useAuth();
//  const formRef = useRef(null);
//  const isInView = useInView(formRef, { once: true });

//  const validateEmail = (email) => {
//  if (!email) return 'Email is required.';
//  if (!/\S+@\S+\.\S+/.test(email)) return 'Email address is invalid.';
//  return '';
//  };

//  const validatePassword = (password) => {
//  if (!password) return 'Password is required.';
//  return '';
//  };

//  const handleChange = (e) => {
//  const { name, value } = e.target;
//  setFormData({
//  ...formData,
//  [name]: value,
//  });

//  // Real-time validation feedback
//  if (name === 'email') {
//  setErrors((prevErrors) => ({
//  ...prevErrors,
//  email: validateEmail(value),
//  }));
//  } else if (name === 'password') {
//  setErrors((prevErrors) => ({
//  ...prevErrors,
//  password: validatePassword(value),
//  }));
//  }
//  };

//  const handleSubmit = async (e) => {
//  e.preventDefault();
//  const emailError = validateEmail(formData.email);
//  const passwordError = validatePassword(formData.password);

//  setErrors({
//  email: emailError,
//  password: passwordError,
//  });

//  if (emailError || passwordError) {
//  return;
//  }

//  setIsLoading(true);

//  try {
//  const result = await login(formData.email, formData.password);
//  console.log("Login result:", result); // Added for debugging

//  if (result.requiresOtp) {
//  setShowOtpField(true);
//  setOtpEmail(result.email);
//  toast.info(result.message || 'OTP required. Please check your email.');
//  } else if (result.success) {
//  toast.success('Login successful!');
//  setLoginSuccess(true);
//  navigate('/dashboard');
//  } else {
//  toast.error(result.message || 'Login failed.');
//  }
//  } catch (error) {
//  if (loginSuccess) {
//  return;
//  }
//  toast.error(error.message || 'An unexpected error occurred. Please try again.');
//  console.error('Unexpected error:', error);
//  } finally {
//  setIsLoading(false);
//  }
//  };

//  const handleOtpChange = (e) => {
//  setOtp(e.target.value);
//  };

//  const handleOtpSubmit = async (e) => {
//  e.preventDefault();
//  setIsLoading(true);
//  try {
//  const result = await verifyOtp(otpEmail, otp);
//  if (result.success) {
//  toast.success('OTP verification successful! Logging in...');
//  setLoginSuccess(true);
//  navigate('/dashboard');
//  } else {
//  toast.error(result.message || 'OTP verification failed.');
//  }
//  } catch (error) {
//  toast.error(error.message || 'An unexpected error occurred during OTP verification. Please try again.');
//  console.error('OTP verification error:', error);
//  } finally {
//  setIsLoading(false);
//  }
//  };

//  // Animation variants
//  const containerVariants = {
//  hidden: { opacity: 0 },
//  visible: {
//  opacity: 1,
//  transition: {
//  staggerChildren: 0.1,
//  delayChildren: 0.2
//  }
//  }
//  };

//  const itemVariants = {
//  hidden: { 
//  opacity: 0, 
//  y: 30,
//  scale: 0.95
//  },
//  visible: { 
//  opacity: 1, 
//  y: 0,
//  scale: 1,
//  transition: {
//  duration: 0.6,
//  ease: [0.25, 0.46, 0.45, 0.94]
//  }
//  }
//  };

//  const formVariants = {
//  hidden: { 
//  opacity: 0, 
//  y: 50,
//  rotateX: -15
//  },
//  visible: { 
//  opacity: 1, 
//  y: 0,
//  rotateX: 0,
//  transition: {
//  duration: 0.8,
//  ease: [0.25, 0.46, 0.45, 0.94]
//  }
//  }
//  };

//  const inputVariants = {
//  hidden: { opacity: 0, x: -20 },
//  visible: { 
//  opacity: 1, 
//  x: 0,
//  transition: {
//  duration: 0.5,
//  ease: "easeOut"
//  }
//  }
//  };

//  const glowVariants = {
//  initial: { scale: 1, opacity: 0.7 },
//  animate: {
//  scale: [1, 1.2, 1],
//  opacity: [0.7, 1, 0.7],
//  transition: {
//  duration: 3,
//  repeat: Infinity,
//  ease: "easeInOut"
//  }
//  }
//  };

//  return (
//  <PublicLayout>
//  {/* Animated background elements */}
//  <div className="fixed inset-0 overflow-hidden pointer-events-none">
//  <motion.div 
//  className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20"
//  animate={{
//  scale: [1, 1.1, 1],
//  rotate: [0, 180, 360]
//  }}
//  transition={{
//  duration: 20,
//  repeat: Infinity,
//  ease: "linear"
//  }}
//  />
//  <motion.div 
//  className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full blur-3xl opacity-20"
//  animate={{
//  scale: [1, 1.2, 1],
//  rotate: [360, 180, 0]
//  }}
//  transition={{
//  duration: 25,
//  repeat: Infinity,
//  ease: "linear"
//  }}
//  />
//  </div>

//  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
//  {/* Animated grid background */}
//  <div className="absolute inset-0 opacity-5">
//  <div className="absolute inset-0" style={{
//  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//  }} />
//  </div>

//  <motion.div 
//  ref={formRef}
//  className="max-w-md w-full space-y-8 relative z-10"
//  variants={containerVariants}
//  initial="hidden"
//  animate={isInView ? "visible" : "hidden"}
//  >
//  {/* Form container with glassmorphism effect */}
//  <motion.div 
//  className="relative p-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
//  variants={formVariants}
//  >
//  {/* Animated border glow */}
//  <motion.div 
//  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl blur-sm opacity-0"
//  animate={{
//  opacity: [0, 0.3, 0]
//  }}
//  transition={{
//  duration: 3,
//  repeat: Infinity,
//  ease: "easeInOut"
//  }}
//  />

//  {/* Header section */}
//  <motion.div 
//  className="text-center"
//  variants={itemVariants}
//  >
//  {/* Logo with glow effect */}
//  <motion.div 
//  className="relative inline-flex items-center justify-center mb-6"
//  variants={itemVariants}
//  >
//  <motion.div 
//  className="absolute w-20 h-20 bg-gray-700 rounded-2xl blur-md opacity-20"
//  variants={glowVariants}
//  initial="initial"
//  animate="animate"
//  />
//  <motion.div 
//  className="relative w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-2xl flex items-center justify-center"
//  whileHover={{ 
//  scale: 1.05,
//  rotate: [0, -5, 5, 0],
//  transition: { duration: 0.3 }
//  }}
//  whileTap={{ scale: 0.95 }}
//  >
//  <Shield className="w-8 h-8 text-white" />
//  <motion.div 
//  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
//  animate={{
//  opacity: [0, 0.3, 0]
//  }}
//  transition={{
//  duration: 2,
//  repeat: Infinity,
//  ease: "easeInOut"
//  }}
//  />
//  </motion.div>
//  </motion.div>

//  <motion.h2 
//  className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-2"
//  variants={itemVariants}
//  >
//  Welcome Back
//  </motion.h2>
 
//  <motion.p 
//  className="text-gray-600 mb-8"
//  variants={itemVariants}
//  >
//  Or{' '}
//  <Link 
//  to="/register" 
//  className="font-medium text-gray-700 hover:text-gray-800 relative group"
//  >
//  <span className="relative z-10">create a new account</span>
//  <motion.div 
//  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:w-full transition-all duration-300"
//  />
//  </Link>
//  </motion.p>
//  </motion.div>

//  {/* Form */}
//  {!showOtpField ? (
//  <motion.form
//  className="space-y-6"
//  onSubmit={handleSubmit}
//  variants={containerVariants}
//  >
//  {/* Email field */}
//  <motion.div variants={inputVariants}>
//  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
//  Email Address
//  </label>
//  <div className="relative group">
//  <motion.div
//  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
//  whileHover={{ scale: 1.1 }}
//  >
//  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
//  </motion.div>
//  <motion.input
//  id="email-address"
//  name="email"
//  type="email"
//  autoComplete="email"
//  required
//  className={`block w-full pl-10 pr-3 py-3 border ${
//  errors.email ? 'border-red-500' : 'border-gray-300'
//  } rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm`}
//  placeholder="Enter your email"
//  value={formData.email}
//  onChange={handleChange}
//  whileFocus={{ scale: 1.02 }}
//  transition={{ duration: 0.2 }}
//  />
//  {errors.email && (
//  <motion.p
//  className="mt-2 text-sm text-red-600"
//  initial={{ opacity: 0, y: -10 }}
//  animate={{ opacity: 1, y: 0 }}
//  transition={{ duration: 0.3 }}
//  >
//  {errors.email}
//  </motion.p>
//  )}
//  </div>
//  </motion.div>

//  {/* Password field */}
//  <motion.div variants={inputVariants}>
//  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//  Password
//  </label>
//  <div className="relative group">
//  <motion.div
//  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
//  whileHover={{ scale: 1.1 }}
//  >
//  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
//  </motion.div>
//  <motion.input
//  id="password"
//  name="password"
//  type={showPassword ? 'text' : 'password'}
//  autoComplete="current-password"
//  required
//  className={`block w-full pl-10 pr-12 py-3 border ${
//  errors.password ? 'border-red-500' : 'border-gray-300'
//  } rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm`}
//  placeholder="Enter your password"
//  value={formData.password}
//  onChange={handleChange}
//  whileFocus={{ scale: 1.02 }}
//  transition={{ duration: 0.2 }}
//  />
//  <motion.button
//  type="button"
//  className="absolute inset-y-0 right-0 pr-3 flex items-center"
//  onClick={() => setShowPassword(!showPassword)}
//  whileHover={{ scale: 1.1 }}
//  whileTap={{ scale: 0.95 }}
//  >
//  <motion.div
//  animate={{ rotate: showPassword ? 180 : 0 }}
//  transition={{ duration: 0.3 }}
//  >
//  {showPassword ? (
//  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//  ) : (
//  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
//  )}
//  </motion.div>
//  </motion.button>
//  {errors.password && (
//  <motion.p
//  className="mt-2 text-sm text-red-600"
//  initial={{ opacity: 0, y: -10 }}
//  animate={{ opacity: 1, y: 0 }}
//  transition={{ duration: 0.3 }}
//  >
//  {errors.password}
//  </motion.p>
//  )}
//  </div>
//  </motion.div>

//  {/* Forgot password link */}
//  <motion.div
//  className="flex items-center justify-end"
//  variants={inputVariants}
//  >
//  <Link
//  to="#"
//  className="text-sm font-medium text-gray-700 hover:text-gray-800 relative group"
//  >
//  <span className="relative z-10">Forgot your password?</span>
//  <motion.div
//  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:w-full transition-all duration-300"
//  />
//  </Link>
//  </motion.div>

//  {/* Submit button */}
//  <motion.div variants={inputVariants}>
//  <motion.button
//  type="submit"
//  disabled={isLoading}
//  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//  whileHover={{ scale: 1.02 }}
//  whileTap={{ scale: 0.98 }}
//  >
//  <motion.div
//  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
//  initial={{ x: '-100%' }}
//  whileHover={{ x: '100%' }}
//  transition={{ duration: 0.6 }}
//  />
 
//  <span className="relative z-10 flex items-center">
//  {isLoading ? (
//  <>
//  <motion.div
//  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//  animate={{ rotate: 360 }}
//  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//  />
//  Signing in...
//  </>
//  ) : (
//  <>
//  Sign in
//  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//  </>
//  )}
//  </span>
//  </motion.button>
//  </motion.div>
//  </motion.form>
//  ) : (
//  <motion.form
//  className="space-y-6"
//  onSubmit={handleOtpSubmit}
//  variants={containerVariants}
//  >
//  <motion.div variants={inputVariants}>
//  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//  Enter OTP
//  </label>
//  <div className="relative group">
//  <motion.div
//  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
//  whileHover={{ scale: 1.1 }}
//  >
//  <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
//  </motion.div>
//  <motion.input
//  id="otp"
//  name="otp"
//  type="text"
//  autoComplete="one-time-code"
//  required
//  className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm`}
//  placeholder="Enter your OTP"
//  value={otp}
//  onChange={handleOtpChange}
//  whileFocus={{ scale: 1.02 }}
//  transition={{ duration: 0.2 }}
//  />
//  </div>
//  </motion.div>
//  <motion.div variants={inputVariants}>
//  <motion.button
//  type="submit"
//  disabled={isLoading}
//  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
//  whileHover={{ scale: 1.02 }}
//  whileTap={{ scale: 0.98 }}
//  >
//  <motion.div
//  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
//  initial={{ x: '-100%' }}
//  whileHover={{ x: '100%' }}
//  transition={{ duration: 0.6 }}
//  />
 
//  <span className="relative z-10 flex items-center">
//  {isLoading ? (
//  <>
//  <motion.div
//  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//  animate={{ rotate: 360 }}
//  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//  />
//  Verifying OTP...
//  </>
//  ) : (
//  <>
//  Verify OTP
//  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//  </>
//  )}
//  </span>
//  </motion.button>
//  </motion.div>
//  </motion.form>
//  )}

//  {/* Floating elements */}
//  <motion.div 
//  className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full opacity-30"
//  animate={{
//  y: [0, -10, 0],
//  x: [0, 5, 0]
//  }}
//  transition={{
//  duration: 3,
//  repeat: Infinity,
//  ease: "easeInOut"
//  }}
//  />
//  <motion.div 
//  className="absolute bottom-4 left-4 w-3 h-3 bg-gray-300 rounded-full opacity-20"
//  animate={{
//  y: [0, -15, 0],
//  x: [0, -8, 0]
//  }}
//  transition={{
//  duration: 4,
//  repeat: Infinity,
//  ease: "easeInOut",
//  delay: 1
//  }}
//  />
//  </motion.div>

//  {/* Additional features hint */}
//  <motion.div 
//  className="text-center"
//  variants={itemVariants}
//  >
//  <motion.p 
//  className="text-sm text-gray-500 flex items-center justify-center"
//  whileHover={{ scale: 1.02 }}
//  >
//  <Sparkles className="w-4 h-4 mr-2" />
//  Secure login with enterprise-grade encryption
//  </motion.p>
//  </motion.div>
//  </motion.div>
//  </div>
//  </PublicLayout>
//  );
// };

// export default LoginPage;



// // src/pages/Auth/LoginPage.jsx
// import React, { useState } from "react";
// import { Eye, EyeOff, CheckCircle } from "lucide-react";
// import apiService from "../../services/api"; // ✅ connect to backend

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isOTPStage, setIsOTPStage] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverMessage, setServerMessage] = useState("");

//   // ---------------- Validation ----------------
//   const validateEmail = (email) => {
//     if (!email) return "Email is required.";
//     if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
//     return "";
//   };
//   const validatePassword = (password) =>
//     !password ? "Password is required." : "";

//   // ---------------- Handle Input ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // ---------------- Send OTP ----------------
//   const handleSendOTP = async (e) => {
//   e.preventDefault();
//   const emailError = validateEmail(formData.email);
//   const passwordError = validatePassword(formData.password);
//   setErrors({ email: emailError, password: passwordError });
//   if (emailError || passwordError) return;

//   try {
//     setIsLoading(true);
//     const res = await apiService.login(formData);
//     setServerMessage(res.message);
//     setIsOTPStage(true);
//   } catch (err) {
//     setServerMessage(err.message || "Failed to send OTP");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // ---------------- Verify OTP ----------------
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       alert("Please enter a 6-digit OTP.");
//       return;
//     }

//     try {
//       setIsVerifying(true);
//       const res = await apiService.verifyOtp(formData.email, otp);
//       setSuccessMessage(res.message);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));
//       setTimeout(() => (window.location.href = "/dashboard"), 1500);
//     } catch (err) {
//       setSuccessMessage(err.message || "Invalid OTP. Try again.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex font-sans transition-all duration-700 ease-in-out">
//       {/* Left Section (Login + OTP) */}
//       <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12">
//         {/* ------------- Login Screen ------------- */}
//         {!isOTPStage && (
//           <div className="max-w-md w-full transition-opacity duration-700">
//             <div className="flex justify-center mb-8">
//               <div
//                 className="w-16 h-16 rounded-lg flex items-center justify-center"
//                 style={{ backgroundColor: "#1AA49B" }}
//               >
//                 <svg
//                   className="w-10 h-10 text-white"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M3 3h8l4 4-4 4H3V3zm10 10h8v8h-8l-4-4 4-4z" />
//                 </svg>
//               </div>
//             </div>

//             <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
//               Welcome to NexIntel AI
//             </h2>
//             <p className="text-gray-500 mb-8 text-center text-sm">
//               Sign in to continue managing your legal workspace.
//             </p>

//             <form className="space-y-5" onSubmit={handleSendOTP}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email / User ID
//                 </label>
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21C1B6]"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-xs text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Enter your password"
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-[#21C1B6]"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-xs text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 px-5 text-white font-semibold rounded-lg transition duration-300 mt-6"
//                 style={{
//                   background:
//                     "linear-gradient(90deg, #21C1B6 0%, #1AA49B 100%)",
//                 }}
//               >
//                 {isLoading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </form>

//             {serverMessage && (
//               <p className="text-sm text-center mt-4 text-gray-600">
//                 {serverMessage}
//               </p>
//             )}
//           </div>
//         )}

//         {/* ------------- OTP Screen ------------- */}
//         {isOTPStage && (
//           <div className="max-w-md w-full text-center animate-fadeIn">
//             <div className="flex justify-center mb-8">
//               <div
//                 className="w-16 h-16 rounded-lg flex items-center justify-center"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #21C1B6 0%, #1AA49B 100%)",
//                 }}
//               >
//                 <CheckCircle className="w-10 h-10 text-white" />
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
//             <p className="text-gray-500 mb-6 text-sm">
//               We’ve sent a 6-digit code to your registered email.
//             </p>

//             <input
//               type="text"
//               maxLength="6"
//               placeholder="Enter 6-digit OTP"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-[#21C1B6]"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <button
//               onClick={handleVerifyOTP}
//               disabled={isVerifying}
//               className="w-full mt-6 py-3 px-5 text-white font-semibold rounded-lg transition duration-300"
//               style={{
//                 background:
//                   "linear-gradient(90deg, #21C1B6 0%, #1AA49B 100%)",
//               }}
//             >
//               {isVerifying ? "Verifying..." : "Verify OTP"}
//             </button>

//             {successMessage && (
//               <p className="text-green-600 mt-4 text-sm animate-fadeIn">
//                 {successMessage}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Right visual column remains same */}
//       <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 items-center justify-center p-12 relative overflow-hidden">
//         {/* visuals */}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/Auth/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import apiService from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isOTPStage, setIsOTPStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Validation
  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    return "";
  };
  
  const validatePassword = (password) =>
    !password ? "Password is required." : "";

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    try {
      setIsLoading(true);
      setServerMessage("");
      const res = await apiService.login(formData);
      setServerMessage(res.message);
      setIsOTPStage(true);
    } catch (err) {
      setServerMessage(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setSuccessMessage("Please enter a 6-digit OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      setSuccessMessage("");
      
      const res = await apiService.verifyOtp(formData.email, otp);
      
      // Store auth data
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      
      // Show success message
      setSuccessMessage(res.message || "Login successful! Redirecting...");
      
      // Use navigate for redirect
      navigate("/dashboard");
      
    } catch (err) {
      setSuccessMessage(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans transition-all duration-700 ease-in-out">
      {/* Left Section (Login + OTP) */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12">
        {/* Login Screen */}
        {!isOTPStage && (
          <div className="max-w-md w-full transition-opacity duration-700">
            <div className="flex justify-center mb-8">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#1AA49B" }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 3h8l4 4-4 4H3V3zm10 10h8v8h-8l-4-4 4-4z" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Welcome to NexIntel AI
            </h2>
            <p className="text-gray-500 mb-8 text-center text-sm">
              Sign in to continue managing your legal workspace.
            </p>

            <form className="space-y-5" onSubmit={handleSendOTP}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email / User ID
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21C1B6] text-black"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-[#21C1B6] text-black"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-5 text-white font-semibold rounded-lg transition duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(90deg, #21C1B6 0%, #1AA49B 100%)",
                }}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>

            {serverMessage && (
              <p className="text-sm text-center mt-4 text-gray-600">
                {serverMessage}
              </p>
            )}
          </div>
        )}

        {/* OTP Screen */}
        {isOTPStage && (
          <div className="max-w-md w-full text-center animate-fadeIn">
            <div className="flex justify-center mb-8">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #21C1B6 0%, #1AA49B 100%)",
                }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
            <p className="text-gray-500 mb-6 text-sm">
              We've sent a 6-digit code to your registered email.
            </p>

            <input
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest text-lg text-black focus:ring-2 focus:ring-[#21C1B6]"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />

            <button
              onClick={handleVerifyOTP}
              disabled={isVerifying || otp.length !== 6}
              className="w-full mt-6 py-3 px-5 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(90deg, #21C1B6 0%, #1AA49B 100%)",
              }}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>

            {successMessage && (
              <p className={`mt-4 text-sm animate-fadeIn ${
                successMessage.includes('Invalid') || successMessage.includes('Please') 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {successMessage}
              </p>
            )}
            
            <button
              onClick={() => {
                setIsOTPStage(false);
                setOtp("");
                setSuccessMessage("");
              }}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>

      {/* Right visual column */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: '#1AA49B' }}></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-lg text-white relative z-10">
          <div className="mb-8 relative">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              </div>
              
              <div className="flex gap-4 items-center justify-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#1AA49B' }}></div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                  <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                </div>
                
                <div className="bg-white rounded-lg p-4 w-48">
                  <div className="space-y-2">
                    <div className="h-3 rounded w-3/4" style={{ backgroundColor: '#1AA49B' }}></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 relative">
                    <div className="absolute top-0 right-0 w-8 h-12 bg-gray-600 rounded transform rotate-45"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-6 rounded" style={{ backgroundColor: '#1AA49B' }}></div>
                  </div>
                  <div className="w-16 h-16 flex items-end justify-center">
                    <div className="w-12 h-12 border-4 border-gray-600 rounded-full relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-8 leading-tight text-center">
            Automate Your Legal Workflow in Minutes
          </h2>

          <div className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(156, 223, 225, 0.2)' }}>
                <svg className="w-5 h-5" style={{ color: '#1AA49B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Accelerate case preparation</h3>
                <p className="text-gray-400 text-sm">in minutes with AI-powered tools</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(156, 223, 225, 0.2)' }}>
                <svg className="w-5 h-5" style={{ color: '#1AA49B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Smart Document Vault</h3>
                <p className="text-gray-400 text-sm">Secure, searchable, and organized</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(156, 223, 225, 0.2)' }}>
                <svg className="w-5 h-5" style={{ color: '#1AA49B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Trusted Legal Insights</h3>
                <p className="text-gray-400 text-sm">AI-driven precedents & analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
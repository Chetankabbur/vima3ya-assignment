'use client';

import { Header } from '@/components/form/Header';
import { Footer } from '@/components/form/Footer';
import { Sidebar } from '@/components/form/Sidebar';
import { FormField } from '@/components/form/FormField';
import { ShimmerLoader } from '@/components/form/ShimmerLoader';
import { SuccessScreen } from '@/components/form/SuccessScreen';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age must be greater than 0')
    .integer('Age must be a whole number')
    .min(1, 'Age must be greater than 0'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^(\+\d{1,3}[-.\s]?)?\d{10}$|^\+\d{13}$/,
      'Phone must be 10 digits or 13 digits with country code (+1xxxxxxxxxx or 10 digit number)'
    ),
  city: Yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  state: Yup.string().required('State is required').min(2, 'State must be at least 2 characters'),
  company: Yup.string().required('Company is required').min(2, 'Company must be at least 2 characters'),
  role: Yup.string().required('Role is required').min(2, 'Role must be at least 2 characters'),
});

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      company: '',
      role: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSubmitAttempted(true);

      // Validate form
      try {
        await validationSchema.validate(values, { abortEarly: false });
        // If validation passes, show loader and success
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          setShowSuccess(true);
        }, 2000);
      } catch (error) {
        // Validation failed, errors will be displayed via formik.errors
        console.log("[v0] Validation errors:");
      }
    },
  });

  const handleResetForm = () => {
    setShowSuccess(false);
    setSubmitAttempted(false);
    formik.resetForm();
  };

  useEffect(() => {
    const checkFormValidity = async () => {
      const errors = await formik.validateForm();

      const hasErrors = Object.keys(errors).length > 0;
      const allFilled = Object.values(formik.values).every(
        (val) => val && val.toString().trim() !== ''
      );

      const valid = !hasErrors && allFilled;

      if (valid) {
        setIsFormValid(true);

        // 🔥 Trigger loader every time form is valid
        setShowLoader(true);

        setTimeout(() => {
          setShowLoader(false);
        }, 3000);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [formik.values]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {showSuccess && <SuccessScreen onReset={handleResetForm} />}
          <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto px-8 py-12">
            {showLoader && <ShimmerLoader />}

            {/* Section A */}
            <div className="mb-12 scroll-mt-16" id="section-a">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                  A
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Section A: Personal Info</h2>
              </div>
              <div className="space-y-6">
                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.name}
                  showError={!!formik.touched.name}
                />
                <FormField
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.age}
                  showError={!!formik.touched.age}
                />
              </div>
            </div>

            {/* Section B */}
            <div className="mb-12 scroll-mt-16" id="section-b">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                  B
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Section B: Contact Info</h2>
              </div>
              <div className="space-y-6">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email}
                  showError={!!formik.touched.email}
                />
                <FormField
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+11234567890 or 1234567890"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.phone}
                  showError={!!formik.touched.phone}
                />
              </div>
            </div>

            {/* Section C */}
            <div className="mb-12 scroll-mt-16" id="section-c">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                  C
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Section C: Address</h2>
              </div>
              <div className="space-y-6">
                <FormField
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.city}
                  showError={!!formik.touched.city}
                />
                <FormField
                  label="State"
                  name="state"
                  type="text"
                  placeholder="Enter your state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.state}
                  showError={!!formik.touched.state}
                />
              </div>
            </div>

            {/* Section D */}
            <div className="mb-12 scroll-mt-16" id="section-d">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                  D
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Section D: Additional Info</h2>
              </div>
              <div className="space-y-6">
                <FormField
                  label="Company"
                  name="company"
                  type="text"
                  placeholder="Enter your company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.company}
                  showError={!!formik.touched.company}
                />
                <FormField
                  label="Role"
                  name="role"
                  type="text"
                  placeholder="Enter your role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.role}
                  showError={!!formik.touched.role}
                />
              </div>
            </div>

            <div className="mt-12 pb-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}
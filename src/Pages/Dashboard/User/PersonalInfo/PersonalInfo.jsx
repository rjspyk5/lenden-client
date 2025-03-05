import {
  CalendarToday,
  Cancel,
  Edit,
  Email,
  LocationOn,
  Person,
  Phone,
  PhotoCamera,
  Save,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../../../Hooks/useUser";
import { useAxiosSequre } from "../../../../Hooks/useAxiosSequre";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    photoURL: "",
    bio: "",
    dateOfBirth: "",
    occupation: "",
    website: "",
  });
  const { user, refetch } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSequre();
  const handleUploadPhoto = () => {
    Swal.fire({
      title: "Upload Profile Photo",
      input: "url",
      inputLabel: "Photo URL",
      inputPlaceholder: "Enter the URL of your profile photo",
      showCancelButton: true,
      confirmButtonText: "Upload",
      showLoaderOnConfirm: true,
      preConfirm: (url) => {
        if (!url) {
          Swal.showValidationMessage("Please enter a valid URL");
          return false;
        }
        return url;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => ({
          ...prev,
          photoURL: result.value,
        }));

        // If not in edit mode, save immediately
        if (!editMode) {
          setLoading(true);
          axiosSecure
            .patch(`/users/${user._id}`, { photoURL: result.value })
            .then(() => {
              refetch();
            })
            .catch((err) => {
              console.error("Error updating profile photo:", err);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Confirm before saving changes
    Swal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to update your profile information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send update request to backend
        axiosSecure
          .patch(`/users/${user._id}`, formData)
          .then(() => {
            refetch(); // Refresh user data
            setEditMode(false);
          })
          .catch((err) => {
            console.error("Error updating profile:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.displayName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        photoURL: user.photoURL || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth || "",
        occupation: user.occupation || "",
        website: user.website || "",
      });
    }
    setEditMode(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid className="!text-white" container spacing={4}>
        {/* Profile Photo Section */}
        <Grid item xs={12} md={4} textAlign="center">
          <Box position="relative" width="fit-content" margin="0 auto">
            <Avatar
              src={formData.photoURL || ""}
              alt={formData.name}
              sx={{ width: 180, height: 180, margin: "0 auto", mb: 2 }}
            />
            <IconButton
              color="primary"
              onClick={handleUploadPhoto}
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <PhotoCamera />
            </IconButton>
          </Box>

          <Typography variant="h6" fontWeight="bold" mt={2}>
            {user?.displayName || "User"}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={1}
          >
            <VerifiedUser color="primary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              Verified Account
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Member since:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </Typography>
        </Grid>

        {/* Profile Details Section - Modified */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" fontWeight="bold" mb={2} color="white">
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            {/* When not in edit mode, show as text */}
            {!editMode ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Full Name
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Person sx={{ color: "white" }} fontSize="small" />
                      {formData.name || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Email
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Email sx={{ color: "white" }} fontSize="small" />
                      {user?.email || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Phone Number
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Phone sx={{ color: "white" }} fontSize="small" />
                      {formData.phone || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Date of Birth
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <CalendarToday sx={{ color: "white" }} fontSize="small" />
                      {formData.dateOfBirth || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Occupation
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Badge sx={{ color: "white" }} fontSize="small" />
                      {formData.occupation || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Website
                    </Typography>
                    <Typography color="white" variant="body1">
                      {formData.website || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Bio
                    </Typography>
                    <Typography color="white" variant="body1">
                      {formData.bio || "No bio added yet"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Address Information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Address
                    </Typography>
                    <Typography
                      color="white"
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <LocationOn sx={{ color: "white" }} fontSize="small" />
                      {formData.address || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      City
                    </Typography>
                    <Typography color="white" variant="body1">
                      {formData.city || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography
                      color="rgba(255,255,255,0.7)"
                      variant="subtitle2"
                    >
                      Country
                    </Typography>
                    <Typography color="white" variant="body1">
                      {formData.country || "Not set"}
                    </Typography>
                  </Box>
                </Grid>
              </>
            ) : (
              // When in edit mode, show as input fields (existing code)
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user?.email || ""}
                    disabled={true}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ color: "white" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                    placeholder="Tell us about yourself"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Address Information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Edit/Save buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<Save />}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalInfo;

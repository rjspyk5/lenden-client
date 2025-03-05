import { CalendarToday } from "@mui/icons-material";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../../../Hooks/useUser";

const EditProfile = () => {
  const { user } = useUser();
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
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
  );
};

export default EditProfile;

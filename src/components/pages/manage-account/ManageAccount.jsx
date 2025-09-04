import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUsername, updatePassword, updateEmail } from "../../../../../Redux/features/user/userSlice";
import { Input } from "../manage-account/manage-account-components/Input";
import { Button } from "../manage-account/manage-account-components/Button";
import {
  Card,
  CardContent,
} from "../manage-account/manage-account-components/Card";
import { toast } from "react-hot-toast";
import {
  updateUsername,
  updatePassword,
  updateEmail,
} from "../../../Redux/features/users/userSlice";
import { useSearchParams } from "react-router-dom";
import Loading from '../../reuseable/Loading'

const ManageAccount = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );

  const [username, setUsername] = useState(user?.username || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [emailPassword, setEmailPassword] = useState("");

  const [searchParams] = useSearchParams();
  const isEmailChanged = searchParams.get("emailUpdated");

  useEffect(() => {
    if (isEmailChanged === "true") toast.success("Email changed successfully!");
    else if (isEmailChanged === "false") toast.error("Email update failed");
  }, []);

  // Update Username
  const handleUsernameUpdate = async () => {
    if (!username) return toast.error("Username is required");
    try {
      await dispatch(updateUsername(username)).unwrap();
      toast.success("Username updated successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  // Update Password
  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword)
      return toast.error("All password fields required");
    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err);
    }
  };

  // Update Email
  const handleEmailUpdate = async () => {
    if (!email || !emailPassword)
      return toast.error("Email and password required");
    try {
      await dispatch(
        updateEmail({ password: emailPassword, newEmail: email })
      ).unwrap();
      toast.success("Confirmation email sent to your new address");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {isLoading && <Loading/>}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-semibold">Update Username</h2>
          <Input
            placeholder="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleUsernameUpdate} disabled={isLoading}>
            Update Username
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <Input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handlePasswordUpdate} disabled={isLoading}>
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-semibold">Update Email</h2>
          <Input
            type="email"
            placeholder="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Current Password"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
          />
          <Button onClick={handleEmailUpdate} disabled={isLoading}>
            Send Confirmation Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAccount;

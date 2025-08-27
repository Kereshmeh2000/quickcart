import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({
  name: "quickcart-next",
});

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, profile_image_url } =
      event.data;

    const userDate = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: profile_image_url,
    };
    await connectDB();
    await User.create(userDate);
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-update-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, profile_image_url } =
      event.data;

    const userDate = {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: profile_image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userDate);
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

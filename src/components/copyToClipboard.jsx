import { toast } from "react-toastify";

export const copyToClipboard = async ({ slug }) => {
  try {
    const url = `https://pastein.vercel.app/api/raw?p=${slug}`;
    await navigator.clipboard.writeText(url);
    toast.success("Text copied successfully.");
  } catch (error) {
    toast.error("Text copied failed.");
  }
};

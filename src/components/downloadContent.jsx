import { mappingType } from "./mappingType";

export const downloadContent = ({ title, content, type }) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.${mappingType(type)}`;
  a.click();
  window.URL.revokeObjectURL(url);
};

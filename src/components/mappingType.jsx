export const mappingType = (type) => {
  switch (type) {
    case "python":
      return "py";
    case "cpp":
      return "cpp";
    case "php":
      return "php";
    case "go":
      return "go";
    case "html":
      return "html";
    case "css":
      return "css";
    case "javascript":
      return "js";
    case "perl":
      return "pl";
    case "java":
      return "java";
    case "ruby":
      return "rb";
    default:
      return "txt";
  }
};

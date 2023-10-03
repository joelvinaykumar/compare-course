export const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
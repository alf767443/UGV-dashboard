import { makeStyles } from "@mui/styles";

const useStyles  = makeStyles({
    card: {
      borderRadius: 16,
      overflow: "hidden"
    },
    media: {
      height: 200,
      width: 200,
      objectFit: "cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
});

export default useStyles

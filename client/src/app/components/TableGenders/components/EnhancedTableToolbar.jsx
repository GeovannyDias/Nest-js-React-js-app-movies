import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Component Toolbar
export function EnhancedTableToolbar(props) {
  const { onAddClick } = props;
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography
        sx={{ flex: "1 1 30%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Géneros
      </Typography>

      <Tooltip title="Add Gender">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
        >
          Add Gender
        </Button>
      </Tooltip>
    </Toolbar>
  );
}

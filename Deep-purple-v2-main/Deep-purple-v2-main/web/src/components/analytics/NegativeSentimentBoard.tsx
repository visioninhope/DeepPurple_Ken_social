import NegativeSentimentPostsTable from "./NegativeSentimentPostsTable";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function NegativeSentimentBoard() {

    return (
        <div className="py-10">
            <section className="pb-2 border-b-2">
                <form>
                    <TextField
                        id="search-bar"
                        color="info"
                        label="Search post"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                    />
                    <IconButton aria-label="search">
                        <SearchIcon style={{ fill: "white" }} />
                    </IconButton>
                </form>
            </section>
            <section className="mt-5">
                <NegativeSentimentPostsTable />
            </section>
        </div>

    )
}


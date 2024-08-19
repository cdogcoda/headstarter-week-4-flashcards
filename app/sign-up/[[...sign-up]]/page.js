import Header from "@/components/Header";
import { SignUp } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-4">
            <Header/>

            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <SignUp/>
            </Box>
        </div>
    )
}
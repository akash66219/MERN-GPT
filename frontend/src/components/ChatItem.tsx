import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppSelector } from "../store/exporter";

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

function parseData(data: any) {
    const lines = data.split('\n');
    const components: any = [];

    lines.forEach((line: any) => {
        if (line.startsWith('-')) {
            const text = line.replace('-', '').trim();
            components.push(<li>{text}</li>);
        } else {
            components.push(<p style={{ marginTop: "5px", marginBottom: "0px" }}>{line}</p>);
        }
    });

    return components;
}


function isCodeBlock(str: string) {
    return ((str.includes("=") || str.includes("#") || str.includes(";") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("//")))
}

const ChatItem = ({ content, role }: { content: string, role: string }) => {
    const messageBlocks = extractCodeFromString(content);

    let userData = useAppSelector(state => state.user)

    return role === "assistant" ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                borderRadius: 2,
                my: 4,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Avatar sx={{ height: "40px", width: "40px", backgroundColor: "#416D19" }}>
                        AI
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>MERN-Bot</Typography>
            </Box>
            <Box sx={{ mt: "-15px" }}>
                {!messageBlocks && (
                    parseData(content).map((block: string, index: number) => {
                        return <Typography sx={{ fontSize: "18px", ml: "50px" }} key={index}>{block}</Typography>
                    })

                )}
                <Box sx={{ ml: "50px" }}>
                    {messageBlocks &&
                        messageBlocks.length &&
                        messageBlocks.map((block: string, index: number) =>
                            isCodeBlock(block) ? (
                                <Box sx={{ my: "15px", fontSize:"18px" }} key={index}> {/* Add key here */}
                                    <SyntaxHighlighter style={atomDark} language="javascript">
                                        {block}
                                    </SyntaxHighlighter>
                                </Box>
                            ) : (
                                <Typography sx={{ fontSize: "18px" }} key={index}> {/* Add key here */}
                                    {block}
                                </Typography>
                            )
                        )}
                </Box>
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                borderRadius: 2,
                my: 1,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Avatar sx={{
                        height: "40px", width: "40px", fontSize: "25px", color: "white", backgroundColor: "#76453B",
                        display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <div>{userData.name[0]}</div>
                    </Avatar>
                </Box>
                <Typography variant="h6" fontWeight={"900"} sx={{ ml: "10px" }}>You</Typography>
            </Box>
            <Box sx={{ mt: "-15px" }}>
                {!messageBlocks && (
                    parseData(content).map((block: string) => {
                        return <Typography sx={{ fontSize: "18px", ml: "50px" }}>{block}</Typography>
                    })
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block, index) =>
                        isCodeBlock(block) ? (
                            <Box sx={{ my: "15px" }} key={index}>
                                <SyntaxHighlighter style={atomDark} language="javascript">
                                    {block}
                                </SyntaxHighlighter>
                            </Box>
                        ) : (
                            <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box>
    );
};

export default ChatItem;


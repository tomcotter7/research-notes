from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from querying.openai import query_openai

rag = FastAPI()

origins = ["*"]

rag.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)


@rag.post("/llm")
async def get_response(user_input: dict):
    return StreamingResponse(
            query_openai(user_input['message'], "regular"),  # type: ignore
            media_type="text/event-stream"
    )

@rag.post("/rag")
async def get_response_with_context(user_input: dict):
    pass

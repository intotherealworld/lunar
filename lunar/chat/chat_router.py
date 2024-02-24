from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from lunar.framework.simple_jinja2_templates import SimpleJinja2Templates
from lunar.solar.solar_client import SolarClient

chat_router = APIRouter(tags=['root'], prefix='/chat')
templates = SimpleJinja2Templates()
solar_client = SolarClient()


@chat_router.get('', include_in_schema=False)
def respond_ui(request: Request):
    return templates.TemplateResponse('chat/chat.html', {'request': request})


class ChatRequest(BaseModel):
    message: str
    stream: bool = True


@chat_router.post('')
def respond_chat(args: ChatRequest):
    return StreamingResponse(solar_client.request(args.message, is_stream=args.stream), media_type='text/event-stream')

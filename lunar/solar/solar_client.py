from openai import OpenAI

from lunar import Environment


class SolarClient:
    def __init__(self):
        self.env = Environment()
        self.client = OpenAI(
            api_key=self.env.get_props('solar.api.key'),
            base_url=self.env.get_props('solar.api.base-url'),
        )

    def request(
            self,
            user_content: str,
            system_content='You are a helpful assistant.',
            is_stream: bool = False,
    ):
        stream = self.client.chat.completions.create(
            model='solar-1-mini-chat',
            messages=[
                {
                    'role': 'system',
                    'content': system_content,
                },
                {
                    'role': 'user',
                    'content': user_content,
                }
            ],
            stream=is_stream,
        )

        if is_stream:
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
        else:
            return stream

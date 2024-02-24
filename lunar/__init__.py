import logging.config
import os.path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from lunar.framework.router_scanner import RouterScanner
from lunar.utility.environment import Environment


def create_app():
    env = Environment()

    logging.config.dictConfig(env.props['lunar']['logger'])

    app = FastAPI(
        title=env.get_props('lunar.docs.title'),
        description=env.get_props('lunar.docs.description'),
        version=env.get_props('lunar.docs.version'),
    )
    app.mount('/static', StaticFiles(directory=f'{os.path.dirname(os.path.realpath(__file__))}/static'), name='static')

    RouterScanner.scan(app)

    return app

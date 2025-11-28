import logging
import os

BASE_LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs")
os.makedirs(BASE_LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(BASE_LOG_DIR, "pipeline.log")

logging.basicConfig(
    filename=LOG_FILE,
    filemode="a",
    format="%(asctime)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)

logger = logging.getLogger("pipeline_logger")
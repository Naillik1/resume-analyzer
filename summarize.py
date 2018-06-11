import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')
import sys
import json
from gensim.summarization.summarizer import summarize
from gensim.summarization import keywords

text = str(sys.argv[1])

def summary_and_keywords(text):
    keywords_raw = keywords(text, scores=True, words=10)
    keywords_list = [{'text': kw[0], 'relevance': round(kw[1], 3)} for kw in keywords_raw]
    return json.dumps({
        "summary": summarize(text),
        "keywords": keywords_list
    })

print(summary_and_keywords(text))
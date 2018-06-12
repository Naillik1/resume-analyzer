import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')
import sys
import json
import multiprocessing as mp
from gensim.summarization.summarizer import summarize
from gensim.summarization import keywords

def get_summary(text, output):
    summary = summarize(text)
    output.put(summary)

def get_keywords(text, output):
    keywords_raw = keywords(text, scores=True, words=10)
    keywords_list = [{'text': kw[0], 'relevance': round(kw[1], 3)} for kw in keywords_raw]
    output.put(keywords_list)

def summary_and_keywords(text):
    output = mp.Queue()    
    processes = [mp.Process(target=get_summary, args=(text, output)),
                mp.Process(target=get_keywords, args=(text, output))]
    for p in processes:
        p.start()
    for p in processes:
        p.join()
    res = [output.get() for p in processes]

    return json.dumps({
        'summary': res[0] if isinstance(res[0], str) else res[1],
        'keywords': res[0] if isinstance(res[0], list) else res[1]
    })


if __name__ == '__main__':
    text = str(sys.argv[1])
    print(summary_and_keywords(text))

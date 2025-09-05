from flask import Flask, jsonify, request
from flask_cors import CORS
from pytrends.request import TrendReq

app = Flask(__name__)
CORS(app)

COUNTRY_CODES = {
    "turkey": "TR",
    "azerbaijan": "AZ",
    "lebanon": "LB"
}

@app.route('/api/trends')
def get_trends():
    country = request.args.get('country', 'turkey').lower()
    geo = COUNTRY_CODES.get(country, 'TR')
    pytrends = TrendReq(hl='en-US', tz=360)
    try:
        pytrends.build_payload([], cat=0, geo=geo, timeframe='now 1-H')
        data = pytrends.trending_searches(pn=country)
        trends = [{"name": row[0]} for row in data.values]
        return jsonify(trends)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
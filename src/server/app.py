from flask import Flask,request,jsonify
import tensorflow as tf
import numpy as np
import pickle
with open("C:/Users/ajayv/pulsecare/src/model.pkl",'rb') as file:
    model = pickle.load(file)
app = Flask(__name__)
@app.route('/flask', methods=['GET','POST'])
def index():
    data = request.get_json()
    temp = data[1]
    spo2 = 96
    pr = data[0]
    result = model.predict(np.array([spo2,pr,temp]).reshape(1,-1))
    print(result[0])
    if int(result[0])==0:
        msg = 'You are healthy'
    else:
        msg = "Your Health is detoriated , Do consult a Doctor"
    return (msg)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
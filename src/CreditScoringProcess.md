## What is Weight of Evidence?

$WOE = ln({Events/NonEvents})$

$ln$, natural log
$Events$, percent of positive events
$NonEvents$, percent of negative events

The log of a number greater than 1 (positive) represents good customers > bad customers, and vice versa for negative.

### Benefits of Weight of Evidence

1. Treats outliers.
2. Handles missing values by binning separately.
3. No need for dummy variables.
4. Strict linear relationship with log odds, in comparison to log, square-root, etc.
5. Outside of the modeling process, we could use a static scorecard rather than building a microservice.

Overall, WOE limits the number of transformations required for a dataset.
### How to calculate Weight of Evidence?

1. Split continuous independent variables into 10 or fewer bins.
2. Count the number of events and non-events for each bin.
3. Calculate the % of events by % of non-events.
4. Calculate the WoE by taking the natural log of % of events divided by % of non-events.

**HINT:** Combine categorical independent variables of similar WOE values, because they have a similar behavior.

### Terminologies related to WOE

**1. [Fine Classing**](https://search.r-project.org/CRAN/refmans/woeBinning/html/woe.binning.html)

> Create 10/20 bins/groups for a continuous independent variable and then calculates WOE and IV of the variable

[**2. Coarse Classing**](https://search.r-project.org/CRAN/refmans/woeBinning/html/woe.binning.html)

> Combine adjacent categories with similar WOE scores

### Usage of WOE

#### Rules

1. Bins should represent 5% of the data.
2. No bin can have zero values/occurrences for events and non-events.
3. Combine similar WOEs.
4. WOE should be [[monotonic]].
5. Create a bin for missing values.

**HINT:** To calculate WOE for missing value bins, add 0.5 to the total number of events/non-events, rather than use the distribution.

$AdjustedWOE = ln (((NonEvents + 0.5) / NonEvents)) / ((Events+ 0.5) / Events))$
### How to check correct binning with WOE

1. Since WOE has to be monotonic, we can check for linearity by plotting WOE values. 
2. run a logistic regression with 1 independent variable at a time. If the [[slope]] i snot 1 or the [[intercept]] is not 
## What is Information Value?

IV = ∑(% of non-events - % of events) * WOE

Information Value (IV) ranks the independent variables by importance.

### Rules related to Information Value

|Information Value|Variable Predictiveness|
|---|---|
|Less than 0.02|Not useful for predicting Events/Non-events|
|0.02 to 0.1|Weak predictive Power|
|0.1 to 0.3|Medium predictive Power|
|0.3 to 0.5|Strong predictive Power|
|>0.5|Suspicious Predictive Power|

**NOTE: Conventions according to [Siddiqi (2006)](https://www.researchgate.net/publication/349548432_Intelligent_Credit_Scoring_Building_and_Implementing_Better_Credit_Risk_Scorecards)

### Important Notices about IV

1. IV increase with number of bins, so more missing event/non-event values with every new bin in the direction of the independent variable with the highest IV.
2. IV is best suited for binary logistic regression models, in comparison to other models, like Random Forest, which detects non-linear relationships.

**NOTE:** Data visualizations were used to interpret linear relationships. However, other methods could have been used.
## Python Code : WOE and IV

There are three methods that I have tested:

1. Python function shared by [Deepanshu Bhalia](https://www.linkedin.com/in/deepanshubhalla/) and adjusted for mobile application specifications (max_bins=6)
2. Functions from the [pywoe](https://github.com/Densur/PyWoE/blob/master/woe.py) package by [Denis Surzhko](https://www.linkedin.com/in/denis-surzhko-phd-prm-61135031/?originalSubdomain=ru)
3. Using the category_encoders library.

#### 4-step WOE calculation with python function (method used in active project):

```python
def iv_woe(data, target, features, bins, show_woe=False):
	# Empty Dataframes for output
	ivDF, woeDF = pd.DataFrame(), pd.DataFrame()
	
	# 1. Split continuous and categorical independent variables
	for ivars in features:
		if trainDF[ivars].dtype.kind in 'bifc' and (len(np.unique(trainDF[ivars]))>10):
		binned_x = pd.cut(trainDF[ivars], bins=bins[ivars], duplicates='drop')
		df0 = pd.DataFrame({'Variable':binned_x, 'SeriousDlqin2yrs':trainDF[target]})
	else:
		df0 = pd.DataFrame({f'Variable':trainDF[ivars], 'SeriousDlqin2yrs':trainDF[target]})
	
	# 2. Count number of target events for each bin
	df0 = df0.astype({"Variable":str})
	df = df0.groupby("Variable", as_index=False, dropna=False).agg({'SeriousDlqin2yrs':["count", "sum"]})
	
	# 3. Calculate the % of events by % of non-events
	df.columns = ['QuantileRange', 'EventsCount', 'EventsSum']
	df['% of Qualified'] = np.maximum(df['EventsSum'], 0.5) / df['EventsSum'].sum()
	df['DelinquentCount'] = df['EventsCount'] - df['EventsSum']
	df['% of Delinquent'] = np.maximum(df['DelinquentCount'], 0.5) / df['DelinquentCount'].sum()
	
	# 4. Calculate the WoE and IV
	df['WoE'] = np.log(df['% of Delinquent']/df['% of Qualified'])
	df['IV'] = df['WoE'] * (df['% of Delinquent']-df['% of Qualified'])
	df.insert(loc=0, column='Variable', value=ivars)
	
	# Record values in ivDF and woeDF
	temp = pd.DataFrame({"Variable":[ivars], "IV":[df['IV'].sum()]}, columns=["Variable", "IV"])
	ivDF = pd.concat([ivDF, temp], axis=0)
	woeDF = pd.concat([woeDF, df], axis=0)
	
	# Show WOE Table
	if show_woe == True:
		print(df)
return ivDF, woeDF
```

**`woe_iv` explained:**

1. Target parameter must be binary.
2. Numeric variable with less than 6 unique values are considered categorical. They are cutoff in the code `len(np.unique(data[ivars]))>6`
3. `'bifc'` are possible outputs for [`numpy.dtype.kind`](https://numpy.org/doc/stable/reference/generated/numpy.dtype.kind.html). This example expects the column dtype to be boolean (b), signed integer (i), floating-point(f), or complex floating-point(c).
4. Pandas function [`qcut`](https://pandas.pydata.org/docs/reference/api/pandas.qcut.html) drops bin_min and bin_max that are duplicates of the next bin's edge values. This function in Python, unlike in R, does not include the lowest value of each bin in a way that does not influence the final output.
5. To calculate WOE for missing value bins, `np.maximum` compares the event value to 0.5 to return a value greater than zero.
6. ***Potential Problem*** is that the it produces a table with all "Variable" columns that are hard to interpret. May have to map original column names by index order.

#### Using pywoe package:

```python
# Load Required Packages
from pywoe.pywoe import WeightOfEvidence

# Read data
data = pd.read_csv()

# Select target and feature columns
target_col = 'target'
feature_cols = []

# Create a WeightOfEvidence object
woe = WeightOfEvidence()

# Calculate the WOE and IV for each feature column
woe_dict = woe.woe(df, target_col, feature_cols)
iv_dict = woe.iv(df, target_col, feature_cols)

for feature, woe_val in woe_dict.items():
	iv_val = iv_dict[feature]
	print(f"Feature: {feature}, WOE: {woe_val}, IV: {iv_val})
```

**NOTE:** Unlike the `woe_iv` method from above, the WOE and IV values are accessed through dictionaries.

#### Using category_encoders:

```python
# Load Required Packages
import pandas as pd
import category_encoders as ce

# Select target and feature columns
target_col = 'target'
feature_cols = []

# Fit and transform a WOE encoder
encoder = ce.WOEEncoder(cols=feature_cols)
encoder.fit(df[feature_cols], df[target_col])
df_woe = encoder.transform(df[feature_cols])

for col, woe_val, iv_val in zip(df_woe.columns, encoder.woe_, encoder.iv_)
	print(f"Feature: {col}, WOE: {woe_val}, IV: {iv_val})
```

**NOTE:** Calculating WoE with natural log may lead to overfitting due to target leakage. In this method, a regularization parameter $a$ is used:

$nominator = (n+a)/(y+2*a)$
$denominator = ln(nominator/denominator)$

*Reference [documentation](https://contrib.scikit-learn.org/category_encoders/woe.html) for further an explanation.*
##### Alternative category encoder method:

```python
# Load train and test sets
trainDF = pd.read_csv()
testDF = pd.read_csv()

# Select targets and features
targetsDF = trainDF.Target
featuresDF = trainDf.drop(['Target'], axis=1)
percent_of_events = targetsDF.mean() * 100
print("Distribution of Positive Events: {.2f}%", .format(percent_of_events))
featuresDF.head()

feature_cols = [col for col in train_features.columns]
woe_encoder = ce.WOEEncoder(cols=columns)
woe_encoded_trainDF = woe_encoder.fit_transform(featuresDF[feature_cols], targetsDF).add_suffix('woe')
featuresDF = featuresDF.join(woe_encoded_trainDF)

woe_encoded_cols = woe_encoded_train.columns


```


## Logistic Regression

### What is Logistic Regression

A Machine Learning method for predicting whether a borrower will default on a loan or become delinquent on their credit cards.
### How is LogReg used in credit scoring?

We run a model using a dataset where the raw values were replaced with the previouslly calculated WoE values. We get the slopes and intercepts for each factor that influences your credit history for later score calculations.

```python
# Instantiate the model
logreg = LogisticRegression()

# Fit the model
logreg.fit(X, y);

# Calculate and Store Coefficients for later
logreg.coef_[0]
scorecard_coefs = pd.DataFrame(zip(X.columns, logreg.coef_[0]), columns=['variable', 'coefficient'])

# Calculate and Store Intercept value
scorecard_coefs = scorecard_coefs.append(pd.DataFrame([['Intercept', logreg.intercept_[0]]], columns=['variable', 'coefficient']))
```

**NOTE:** The `logreg` object was stored using a [pickle format](https://docs.python.org/3/library/pickle.html) for future functions. The data frames containing the coefficients and intercept were used for model validation.
### Verifying outputs from the model

According to our research, we should expect a slope of one for each variable coefficient. Our results were not identical, but they were all close to the target coefficient value, within 1%.
## Building a Scorecard


$Score_i= (βi × WoE_i + α/n) × Factor + Offset/n$

**Where:**

* $βi$ — logistic regression coefficient for the variable Xi
* $α$ — logistic regression intercept
* $WoE$ — Weight of Evidence value for variable Xi
* $n$ — number of independent variable Xi in the model
* $Factor$, $Offset$ — known as scaling parameter, where

$Factor = pdo/ln(2)$
$Offset = Target Score — (Factor × ln(Target Odds))$

### Using the scorecardpy module:

```python
# Adjust Bins
breaks_adj = {
			  'NumberOfDependents': [2, 20],
			  'age': [18, 26, 35, 45, 65],...
}

# Create Bins
bins_adj = sc.woebin(train, y="SeriousDlqin2yrs", breaks_list=breaks_adj)

# Create Scorecard
card = sc.scorecard(bins_adj, lr, xcolumns, points0=1025, odds0=1/9, pdo=41, basepoints_eq0=False, digits=0)

# Calculate Credit Scores
train_score = sc.scorecard_ply(train, card, print_step=0)
```

##### References
[WOE and IV Explained](https://www.listendata.com/2015/03/weight-of-evidence-woe-and-information.html)
[WOE and IVE in Python/pandas](https://www.aionlinecourse.com/blog/how-to-get-the-weight-of-evidence-woe-and-information-value-iv-in-pythonpandas)
[Intro to Categorical Encoders and Benchmarks](https://www.kaggle.com/code/subinium/11-categorical-encoders-and-benchmark)
[Weight of Evidence Encoding](https://www.kaggle.com/code/davidbnn92/weight-of-evidence-encoding)

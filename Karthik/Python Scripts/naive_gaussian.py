import numpy as np


def fit(X, y):
    n_samples, n_features = X.shape
    class_count = np.unique(y)
    n_classes = len(class_count)

    mean = np.zeros((n_classes, n_features), dtype=np.float64)
    var = np.zeros((n_classes, n_features), dtype=np.float64)
    prior = np.zeros(n_classes, dtype=np.float64)

    for idx, c in enumerate(class_count):
        X_c = X[y == c]
        mean[idx, :] = X_c.mean(axis=0)
        var[idx, :] = X_c.var(axis=0)
        prior[idx] = X_c.shape[0] / float(n_samples)

    return mean, var, prior, class_count


def calc_pdf(idx, X, mean, var):
    mean = mean[idx]
    varx = np.diag(var[idx])
    z = np.power(2 * np.pi, X.shape[0] / 2) * np.power(np.linalg.det(varx), 0.5)
    return (1 / z) * np.exp((-1 / 2) * (X - mean).T @ np.linalg.inv(varx) @ (X - mean))


def log_likelihood_prior(X, classes, mean, var, prior):
    prod_likelihood_prior = np.zeros((X.shape[0], len(classes)), dtype=np.float64)
    for x_idx, x in enumerate(X):
        for idx, c in enumerate(classes):
            prod_likelihood_prior[x_idx, c] = np.log(calc_pdf(idx, x, mean, var)) + np.log(prior[idx])
    return prod_likelihood_prior


def predict(X):
    return np.argmax(X, axis=1)


def naive_gmodel_eval(X_train, y_train, X_test, y_test):
    (mean, var, prior, class_count) = fit(X_train, y_train)
    Prod_Log_like = log_likelihood_prior(X_test, class_count, mean, var, prior)

    y_pred = np.argmax(Prod_Log_like, axis=1)

    metrics = {}
    for c in class_count:
        TP = np.where((y_pred == c) & (y_test == c), 1, 0).sum()
        TN = np.where((y_pred != 0) & (y_test != c), 1, 0).sum()
        FP = np.where((y_pred == c) & (y_test != c), 1, 0).sum()
        FN = np.where((y_pred != c) & (y_test == c), 1, 0).sum()

        metrics[c] = {}
        metrics[c]["Precision"] = float(TP / (TP + FP))
        metrics[c]["Recall"] = float(TP / (TP + FN))
        metrics[c]["Accuracy"] = float((TP + TN) / (TP + TN + FP + FN))
        metrics[c]["F1 Score"] = float(
            (2 * float(TP / (TP + FP)) * float(TP / (TP + FN))) / (float(TP / (TP + FP)) + float(TP / (TP + FN))))
        metrics[c]["Misclassification Rate"] = (1 - float((TP + TN) / (TP + TN + FP + FN)))

    return metrics

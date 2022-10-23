import numpy as np


class fit_softSVM:
    def __init__(self, C=15):
        self._support_vectors = None
        self.C = C
        self.w = None
        self.b = None
        self.X = None
        self.y = None
        self.n = 0
        self.d = 0

    def __decision_function(self, X):
        return X.dot(self.w) + self.b

    def __cost(self, margin):
        return (1 / 2) * self.w.dot(self.w) + self.C * np.sum(np.maximum(0, 1 - margin))

    def __margin(self, X, y):
        return y * self.__decision_function(X)

    def fit(self, X, y, lr=0.01, epochs=100):
        self.n, self.d = X.shape
        self.w = np.random.rand(self.d)
        self.b = 0

        self.X = X
        self.y = y
        loss_array = []

        for _ in range(epochs):
            margin = self.__margin(X, y)
            loss = self.__cost(margin)
            loss_array.append(loss)

            misclassified_pts_idx = np.where(margin < 1)[0]
            d_w = self.w - self.C * y[misclassified_pts_idx].dot(X[misclassified_pts_idx])
            self.w = self.w - lr * d_w

            d_b = - self.C * np.sum(y[misclassified_pts_idx])
            self.b = self.b - lr * d_b

        self._support_vectors = np.where(self.__margin(X, y) <= 1)[0]

    def predict(self, X):
        return np.sign(self.__decision_function(X))

    def score(self, X, y):
        P = self.predict(X)
        return np.mean(y == P)


def compute_accuracy(X_train, y_train, X_test, y_test):
    svm = fit_softSVM(C=15)
    svm.fit(X_train, y_train)
    return svm.score(X_test, y_test)

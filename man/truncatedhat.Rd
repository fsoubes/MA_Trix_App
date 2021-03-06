% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/heatmtruncated.R
\name{truncatedhat}
\alias{truncatedhat}
\title{truncatedhat is an event reactive function that pre-computed hierarchical clustering}
\usage{
truncatedhat(exprData, geneSet, groups, k = 3, algo = "ward.D2",
  colOrder = NULL, na.color = "black", hclustGenes = T,
  meanGrp = F, plotRowSideColor = T, mypal = NULL,
  RowSideColor = c("gray25", "gray75"), Rowdistfun = "correlation",
  Coldistfun = "correlation", palette.col = NULL, notplot = T,
  genename = pval)
}
\arguments{
\item{exprData}{A data frame with all the individuals selected}

\item{geneSet}{A data frame with the indexes corresponding to the sigificant genes}

\item{groups}{A data frame with the corresponding groups}

\item{k}{A numeric vector value which aim is to defined the treshold value to cut the dendogram}

\item{algo}{Algorithmic method for grouping a matrix of a given distance}

\item{colOrder}{Positive numbers, used as cex.axis in for the row or column axis labeling}

\item{na.color}{Color used for missing values}

\item{hclustGenes}{Function used to compute the hierarchical clustering when Rowv or Colv are not dendrograms}

\item{meanGrp}{A Boolean value to computes the mean for each groups; default = F}

\item{plotRowSideColor}{Bolean value that colors or not the rows side}

\item{mypal}{A chacter vector of colors}

\item{RowSideColor}{A character vector of length nrow containing the color names for a vertical side bar that may be used to annotate the rows of x.}

\item{Rowdistfun}{Function used to compute the distance for the rows}

\item{Coldistfun}{Function used to compute the distance for the columns}

\item{palette.col}{NULL}

\item{notplot}{A boolean for ploting or not the heatmap}

\item{genename}{A character vector of gene symbols}
}
\value{
list of objects which aim is to being passed as argument in the plotHeatmaps function
}
\description{
truncatedhat is an event reactive function that pre-computed hierarchical clustering
}

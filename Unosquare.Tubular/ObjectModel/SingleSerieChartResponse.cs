﻿namespace Unosquare.Tubular.ObjectModel
{
    /// <summary>
    /// Creates a single-serie chart reponse
    /// </summary>
    /// <typeparam name="L"></typeparam>
    public class SingleSerieChartResponse<L>
    {
        /// <summary>
        /// The chart response data
        /// </summary>
        public L[] Data;
        /// <summary>
        /// The chart labels
        /// </summary>
        public string[] Labels;
    }
}

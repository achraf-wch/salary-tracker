/*
          
              <h3 className="mt-3 m-3 col-5">date</h3>
              <div>
                  <input type="date" className={errors.startDate===""?"form-control col-12" :"form-control col-12 bg-danger"} placeholder='start date'
                  value = {startDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
                  {errors.startDate===""?"":<p>{errors.startDate}</p>}
              </div>
              <div>
                    <input type="date" className={errors.endDate===""?"form-control mt-3" :"form-control mt-3 bg-danger" }placeholder='end date'
                    value = {endDate} onChange={(e)=>{
                    setEndDate(e.target.value)
                    }}/>
                    {errors.endDate===""?"":<p>{errors.endDate}</p>}
              </div>
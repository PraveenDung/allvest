const { getCompanyById } = require('../../controllers/companyController');
const Company = require('../../models/Company');

jest.mock('../../models/Company'); // Mock the Mongoose model

describe('getCompanyById controller', () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  it('should return 200 with company data if found', async () => {
    const mockCompany = { _id: '123', name: 'Mock Corp', quantity: 50 };
    Company.findById.mockResolvedValue(mockCompany);

    const req = { params: { id: '123' } };
    const res = mockRes();

    await getCompanyById(req, res);

    expect(Company.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCompany);
  });

  it('should return 404 if company is not found', async () => {
    Company.findById.mockResolvedValue(null);

    const req = { params: { id: 'nonexistent' } };
    const res = mockRes();

    await getCompanyById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Company not found' });
  });

  it('should return 500 on DB error', async () => {
    Company.findById.mockRejectedValue(new Error('DB Error'));

    const req = { params: { id: '123' } };
    const res = mockRes();

    await getCompanyById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
  });
});
